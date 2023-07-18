'use client';
import { getCategories } from "@/services/api";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../contexts/StoreContext";

function CategoriesList() {
  const { requestProducts } = useContext(StoreContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const test = async () => {
      const data = await getCategories();
      setCategories(data);
    }

    test();
  }, []);

  const mapCategories = categories.map((category) => (
    <label key={category.id}>
      <input type="radio" value={category.id} onChange={ (e) => requestProducts(e.target.value, undefined) } />
      {category.name}
    </label>
  ));

  return (
    <div>
      {mapCategories}
    </div>
  );
}

export default CategoriesList;