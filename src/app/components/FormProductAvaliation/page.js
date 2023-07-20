import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { getAvaliationsFromLocalStorage } from '@/services/localStorage';
import CustomizedRating from '../Rating/page';

function FormProductAvaliation(props) {
  const { attLocalStorage, handleFormAvaliation, avaliation, addAvaliation } = useContext(AppContext);
  const [avaliationsList, setAvaliationsList] = useState([]);

  useEffect(() => {
    const avaliationsLocal = getAvaliationsFromLocalStorage();
    const avaliationsByProductId = avaliationsLocal.filter((avaliation) => avaliation.productId === props.productId);
    setAvaliationsList(avaliationsByProductId);
  }, [props.productId, attLocalStorage]);

  const mapAvaliations = avaliationsList.map((avaliation) => (
    <div
      key={ `avaliationId-${avaliation.avaliationId}` }
      className='px-4'
    >
      <div className='flex justify-between'>
        <h4 className='font-bold text-lg'>{avaliation.email}</h4>
        <span>{`Nota ${avaliation.rating}`}</span>
      </div>
      <p className='h-16 min-h-full'>{`- ${avaliation.message}`}</p>
    </div>
  ));

  return (
    <div className='text-gray-300'>
      <h3 className='p-2 text-2xl font-semibold'>Avaliações ↓</h3>
      <form className='p-2 flex flex-col justify-center items-center gap-2'>
        <div className='grid grid-cols-2 gap-4 h-9 justify-center items-center'>
          <input
            className='bg-gray-800 bg-opacity-20 border-b-2 border-gray-800 font-normal text-lg px-2 h-9 placeholder:text-gray-700 rounded-sm'
            type='email'
            placeholder='Email'
            name='email'
            value={avaliation.email}
            onChange={ handleFormAvaliation }
          />
          <div className='flex justify-center'>
          <CustomizedRating />
          </div>
        </div>
        <textarea
          className='bg-gray-800 bg-opacity-20 border-b-2 border-gray-800 font-normal text-lg px-2 placeholder:text-gray-700 rounded-sm w-full h-28'
          placeholder='Mensagem'
          name='message'
          value={avaliation.message}
          onChange={ handleFormAvaliation }
        />
        <button
          type='button'
          onClick={ () => addAvaliation(props.productId) }
          className='bg-accent tracking-wider font-bold text-xl text-base w-full h-10 mt-1 py-0.5 leading-4 rounded shadow-lg px-1'
        >
          Avaliar
        </button>
      </form>
      { avaliationsList && mapAvaliations }
    </div>
  );
}

export default FormProductAvaliation;