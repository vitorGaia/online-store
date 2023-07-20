import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { getAvaliationsFromLocalStorage } from '@/services/localStorage';

function FormProductAvaliation(props) {
  const { handleFormAvaliation, avaliation, addAvaliation } = useContext(AppContext);
  const [avaliationsList, setAvaliationsList] = useState([]);

  useEffect(() => {
    const avaliations = getAvaliationsFromLocalStorage();
    const avaliationsByProductId = avaliations.filter((avaliation) => avaliation.productId === props.productId);
    setAvaliationsList(avaliationsByProductId);
  }, [props.productId]);

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
    <div className=''>
      <h3 className='p-2 text-2xl font-semibold'>Avaliações ↓</h3>
      <form className='p-2 flex flex-col justify-center items-center gap-2'>
        <div className='grid grid-cols-2 gap-2 h-9'>
          <input
            className='bg-transparent px-2 border-2 border-accentM rounded-md'
            type='email'
            placeholder='Email'
            name='email'
            value={avaliation.email}
            onChange={ handleFormAvaliation }
          />
          <div className='flex justify-center items-center gap-2'>
            <label className='flex items-center font-medium text-accentM'>
              <input
                className='bg-transparent border-accentM'
                type='radio'
                value={1}
                name='rating'
                onChange={handleFormAvaliation}
              />
              1
            </label>
            <label className='flex items-center font-medium text-accentM'>
              <input
                className='bg-transparent border-accentM'
                type='radio'
                value={2}
                name='rating'
                onChange={handleFormAvaliation}
              />
              2
            </label>
            <label className='flex items-center font-medium text-accentM'>
              <input
                className='bg-transparent border-accentM'
                type='radio'
                value={3}
                name='rating'
                onChange={handleFormAvaliation}
              />
              3
            </label>
            <label className='flex items-center font-medium text-accentM'>
              <input
                className='bg-transparent border-accentM'
                type='radio'
                value={4}
                name='rating'
                onChange={handleFormAvaliation}
              />
              4
            </label>
            <label className='flex items-center font-medium text-accentM'>
              <input
                className='bg-transparent border-accentM'
                type='radio'
                value={5}
                name='rating'
                onChange={handleFormAvaliation}
              />
              5
            </label>
          </div>
        </div>
        <textarea
          className='bg-transparent p-2 border-2 border-accentM rounded-md w-full h-28'
          placeholder='Mensagem'
          name='message'
          value={avaliation.message}
          onChange={ handleFormAvaliation }
        />
        <button
          type='button'
          onClick={ () => addAvaliation(props.productId) }
          className='bg-accentM tracking-wider font-bold text-xl w-full h-10 mt-1 py-0.5 leading-4 rounded shadow-lg px-1'
        >
          Avaliar
        </button>
      </form>
      { avaliationsList && mapAvaliations }
    </div>
  );
}

export default FormProductAvaliation;