'use client';
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
      className='p-4 border-t-2 border-gray-800 lg:mt-12'
    >
      <div className='flex justify-between'>
        <h4 className='font-bold text-lg'>{avaliation.email}</h4>
        <span>{`Nota ${avaliation.rating}`}</span>
      </div>
      <p className=''>{`- ${avaliation.message}`}</p>
    </div>
  ));

  return (
    <div
      className='text-font w-full bg-slate-200 lg:px-48 lg:py-12'
    >
      <h3
        className='p-2 text-2xl font-semibold lg:text-center'
      >
        Avaliações
      </h3>
      <form
        className='p-2 flex flex-col justify-center items-center gap-2 lg:bg-baseM lg:px-72 lg:py-14 lg:rounded-md shadow-md'
      >
        <div className='flex gap-4 h-9 justify-center items-center lg:justify-between lg:gap-16 lg:w-full'>
          <input
            className='border-b-2 font-normal text-lg px-2 h-9 w-3/4 lg:w-full placeholder:text-fontM rounded-sm bg-gray-500 bg-opacity-10 border-fontM hover:bg-slate-300 transition'
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
          className='placeholder:text-fontM rounded-sm bg-gray-500 bg-opacity-10 border-fontM hover:bg-slate-300 transition border-b-2 font-normal text-lg px-2 w-full h-28 lg:w-full'
          placeholder='Mensagem'
          name='message'
          value={avaliation.message}
          onChange={ handleFormAvaliation }
        />
        <button
          type='button'
          onClick={ () => addAvaliation(props.productId) }
          className='bg-accent tracking-wider font-bold text-xl text-base w-full h-10 mt-1 py-0.5 leading-4 rounded shadow-lg px-1 mb-2 hover:accentHover transition'
        >
          Avaliar
        </button>
      </form>
      { avaliationsList && mapAvaliations }
    </div>
  );
}

export default FormProductAvaliation;