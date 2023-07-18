import React from 'react';

function FormCheckout(props) {
  return (
    <form>
      <div>
        <input type='text' placeholder='Nome' />
        <input type='text' placeholder='CPF' />
      </div>
      <div>
        <input type='email' placeholder='Email' />
        <input type='text' placeholder='Telefone' />
      </div>
      <div>
        <input type='text' placeholder='Cep' />
        <input type='text' placeholder='Endereço' />
      </div>
      <div>
        <input type='text' placeholder='Complemento' />
        <input type='text' placeholder='Número' />
      </div>
      <div>
        <input type='text' placeholder='Cidade' />
        <input type='text' placeholder='Estado' />
      </div>
      <div>
        <label><input type='radio' />Boleto</label>
        <label><input type='radio' />Visa</label>
        <label><input type='radio' />MasterCard</label>
        <label><input type='radio' />Elo</label>
      </div>
      <button type='submit'>Comprar</button>
    </form>
  );
}

export default FormCheckout;