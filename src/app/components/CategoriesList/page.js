'use client';
import { getCategories } from "@/services/api";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";

function CategoriesList() {
  const { activeSearch, handleActiveSearch } = useContext(AppContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const test = async () => {
      const data = await getCategories();
      setCategories(data);
    }

    test();
  }, []);

  const mapCategories = categories.map((category) => (
    <label
      key={category.id}
      className="flex items-center ml-2"
    >
      <input
        type="radio"
        value={category.id}
        onChange={ (e) => handleActiveSearch('category', e.target.value) }
        className="form-radio"
      />
      {category.name}
    </label>
  ));

  return (
    <div className={`${activeSearch ? 'grid' : 'hidden'} grid-cols-1 w-8/12`}>
      {mapCategories}
    </div>
  );
}

export default CategoriesList;