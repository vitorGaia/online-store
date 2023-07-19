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
    <div key={ avaliation.avaliationId }>
      <h4>{avaliation.email}</h4>
      <span>{`Nota ${avaliation.rating}`}</span>
      <p>{avaliation.message}</p>
    </div>
  ));

  return (
    <div>
      <h3>Avaliações</h3>
      <form>
        <div>
          <input type='email' placeholder='Email' name='email' value={avaliation.email} onChange={ handleFormAvaliation } />
          <div>
            <label><input type='radio' value={1} name='rating' onChange={ handleFormAvaliation } />1</label>
            <label><input type='radio' value={2} name='rating' onChange={ handleFormAvaliation } />2</label>
            <label><input type='radio' value={3} name='rating' onChange={ handleFormAvaliation } />3</label>
            <label><input type='radio' value={4} name='rating' onChange={ handleFormAvaliation } />4</label>
            <label><input type='radio' value={5} name='rating' onChange={ handleFormAvaliation } />5</label>
          </div>
        </div>
        <textarea placeholder='Mensagem' name='message' value={avaliation.message} onChange={ handleFormAvaliation } />
        <button type='button' onClick={ () => addAvaliation(props.productId) }>Avaliar</button>
      </form>
      { avaliationsList && mapAvaliations }
    </div>
  );
}

export default FormProductAvaliation;