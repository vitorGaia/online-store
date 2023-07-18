'use client';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';

function Checkout(props) {
  const { globalState } = useContext(AppContext);
  
  useEffect(() => {}, []);

  return (
    <div>
      Checkout
    </div>
  );
}

export default Checkout;