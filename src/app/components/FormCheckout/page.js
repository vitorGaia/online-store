import { CreditCard } from '@mui/icons-material';
import React from 'react';
import { BiBarcode, BiLogoMastercard, BiLogoVisa } from 'react-icons/bi';

function FormCheckout() {
  return (
    <form className='flex flex-col items-center justify-center gap-3 px-2 py-4'>
      <div className='flex w-full gap-3'>
        <input
          type='text'
          placeholder='Nome'
          className='w-2/4 bg-gray-800 bg-opacity-20 border-b-2 border-gray-800 font-normal text-lg px-2 h-9 placeholder:text-gray-700 rounded-sm'
        />
        <input
          type='text'
          placeholder='CPF'
          className='w-2/4 bg-gray-800 bg-opacity-20 border-b-2 border-gray-800 font-normal text-lg px-2 h-9 placeholder:text-gray-700 rounded-sm'
        />
      </div>
      <div className='flex w-full gap-3'>
        <input
          type='email'
          className='w-2/4 bg-gray-800 bg-opacity-20 border-b-2 border-gray-800 font-normal text-lg px-2 h-9 placeholder:text-gray-700 rounded-sm'
          placeholder='Email'
        />
        <input
          type='text'
          className='w-2/4 bg-gray-800 bg-opacity-20 border-b-2 border-gray-800 font-normal text-lg px-2 h-9 placeholder:text-gray-700 rounded-sm'
          placeholder='Telefone'
        />
      </div>
      <div className='flex w-full gap-3'>
        <input
          type='text'
          className='w-2/4 bg-gray-800 bg-opacity-20 border-b-2 border-gray-800 font-normal text-lg px-2 h-9 placeholder:text-gray-700 rounded-sm'
          placeholder='Cep'
        />
        <input
          type='text'
          className='w-2/4 bg-gray-800 bg-opacity-20 border-b-2 border-gray-800 font-normal text-lg px-2 h-9 placeholder:text-gray-700 rounded-sm'
          placeholder='Endereço'
        />
      </div>
      <div className='flex w-full gap-3'>
        <input
          type='text'
          className='w-2/4 bg-gray-800 bg-opacity-20 border-b-2 border-gray-800 font-normal text-lg px-2 h-9 placeholder:text-gray-700 rounded-sm'
          placeholder='Complemento'
        />
        <input
          type='text'
          className='w-2/4 bg-gray-800 bg-opacity-20 border-b-2 border-gray-800 font-normal text-lg px-2 h-9 placeholder:text-gray-700 rounded-sm'
          placeholder='Número'
        />
      </div>
      <div className='flex w-full gap-3'>
        <input
          type='text'
          className='w-2/4 bg-gray-800 bg-opacity-20 border-b-2 border-gray-800 font-normal text-lg px-2 h-9 placeholder:text-gray-700 rounded-sm'
          placeholder='Cidade'
        />
        <input
          type='text'
          className='w-2/4 bg-gray-800 bg-opacity-20 border-b-2 border-gray-800 font-normal text-lg px-2 h-9 placeholder:text-gray-700 rounded-sm'
          placeholder='Estado'
        />
      </div>
      <div className='flex gap-4'>
        <button className='text-3xl'><BiBarcode/></button>
        <button className='text-5xl'><BiLogoVisa/></button>
        <button className='text-4xl'><BiLogoMastercard/></button>
        <button className='text-5xl flex justify-center items-center'><CreditCard/></button>
      </div>
      <button type='submit' className='bg-accent tracking-wider font-bold text-xl text-base w-full h-10 mt-1 py-0.5 leading-4 rounded shadow-lg px-1'>Comprar</button>
    </form>
  );
}

export default FormCheckout;