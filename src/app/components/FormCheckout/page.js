import { CreditCard } from '@mui/icons-material';
import React from 'react';
import { BiBarcode, BiLogoMastercard, BiLogoVisa } from 'react-icons/bi';

function FormCheckout() {
  return (
    <form className='flex flex-col items-center justify-center gap-3 px-2 py-4 lg:gap-11'>
      <h2 className="text-xl py-4 font-semibold">Informações do comprador</h2>
      <div className='flex flex-col gap-4'>
      <div className='flex w-full gap-3'>
        <input
          type='text'
          placeholder='Nome'
          className='w-2/4 border-b-2 font-normal text-lg px-2 h-9 placeholder:text-fontM rounded-sm bg-gray-500 bg-opacity-10 border-fontM hover:bg-slate-300 transition'
        />
        <input
          type='text'
          placeholder='CPF'
          className='w-2/4 border-b-2 font-normal text-lg px-2 h-9 placeholder:text-fontM rounded-sm bg-gray-500 bg-opacity-10 border-fontM hover:bg-slate-300 transition'
        />
      </div>
      <div className='flex w-full gap-3'>
        <input
          type='email'
          className='w-2/4 border-b-2 font-normal text-lg px-2 h-9 placeholder:text-fontM rounded-sm bg-gray-500 bg-opacity-10 border-fontM hover:bg-slate-300 transition'
          placeholder='Email'
        />
        <input
          type='text'
          className='w-2/4 border-b-2 font-normal text-lg px-2 h-9 placeholder:text-fontM rounded-sm bg-gray-500 bg-opacity-10 border-fontM hover:bg-slate-300 transition'
          placeholder='Telefone'
        />
      </div>
      <div className='flex w-full gap-3'>
        <input
          type='text'
          className='w-1/3 border-b-2 font-normal text-lg px-2 h-9 placeholder:text-fontM rounded-sm bg-gray-500 bg-opacity-10 border-fontM hover:bg-slate-300 transition'
          placeholder='Cep'
        />
        <input
          type='text'
          className='w-2/3 border-b-2 font-normal text-lg px-2 h-9 placeholder:text-fontM rounded-sm bg-gray-500 bg-opacity-10 border-fontM hover:bg-slate-300 transition'
          placeholder='Endereço'
        />
      </div>
      <div className='flex w-full gap-3'>
        <input
          type='text'
          className='w-2/3 border-b-2 font-normal text-lg px-2 h-9 placeholder:text-fontM rounded-sm bg-gray-500 bg-opacity-10 border-fontM hover:bg-slate-300 transition'
          placeholder='Complemento'
        />
        <input
          type='text'
          className='w-1/3 border-b-2 font-normal text-lg px-2 h-9 placeholder:text-fontM rounded-sm bg-gray-500 bg-opacity-10 border-fontM hover:bg-slate-300 transition'
          placeholder='Número'
        />
      </div>
      <div className='flex w-full gap-3'>
        <input
          type='text'
          className='w-2/3 border-b-2 font-normal text-lg px-2 h-9 placeholder:text-fontM rounded-sm bg-gray-500 bg-opacity-10 border-fontM hover:bg-slate-300 transition'
          placeholder='Cidade'
        />
        <input
          type='text'
          className='w-1/3 border-b-2 font-normal text-lg px-2 h-9 placeholder:text-fontM rounded-sm bg-gray-500 bg-opacity-10 border-fontM hover:bg-slate-300 transition'
          placeholder='Estado'
        />
      </div>
      </div>
      <div className='flex gap-4'>
        <button type='button' className='text-4xl lg:text-6xl hover:text-accent transition'>
          <BiLogoMastercard/>
        </button>
        <button type='button' className='text-5xl lg:text-6xl hover:text-accent transition'>
          <BiLogoVisa/>
        </button>
        <button type='button' className='text-3xl lg:text-6xl hover:text-accent transition'>
          <BiBarcode/>
        </button>
      </div>
      <button type='submit' className='bg-accent tracking-wider font-bold text-xl text-base w-full h-10 mt-1 py-0.5 leading-4 rounded shadow-md px-1 lg:w-96 hover:bg-emerald-600 transition'>Comprar</button>
    </form>
  );
}

export default FormCheckout;