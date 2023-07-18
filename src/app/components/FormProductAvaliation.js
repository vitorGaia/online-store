import React, { useState } from 'react';

function FormProductAvaliation(props) {
  const [avaliation, setAvaliation] = useState({
    email: '',
    rating: 0,
    message: '',
  });

  const handleForm = (e) => setAvaliation({ ...avaliation, [e.target.name]: e.target.value });

  return (
    <div>
      <h3>Avaliações</h3>
      <form>
        <div>
          <input type='email' placeholder='Email' name='email' onChange={ handleForm } />
          <div>
            <label><input type='radio' value={1} name='rating' onChange={ handleForm } />1</label>
            <label><input type='radio' value={2} name='rating' onChange={ handleForm } />2</label>
            <label><input type='radio' value={3} name='rating' onChange={ handleForm } />3</label>
            <label><input type='radio' value={4} name='rating' onChange={ handleForm } />4</label>
            <label><input type='radio' value={5} name='rating' onChange={ handleForm } />5</label>
          </div>
        </div>
        <textarea placeholder='Mensagem' name='message' onChange={ handleForm } />
        <button type='submit'>Avaliar</button>
      </form>
    </div>
  );
}

export default FormProductAvaliation;