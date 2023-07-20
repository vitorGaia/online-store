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
      className="flex justify-center"
      htmlFor="category"
    >
      <button
        id="category"
        type="button"
        value={category.id}
        onClick={ (e) => handleActiveSearch('category', e.target.value) }
        className="text-lg font-medium tracking-wide h-9"
      >
      {category.name}
      </button>
    </label>
  ));

  return (
    <div className={`${activeSearch ? 'flex flex-col' : 'hidden'} divide-y-2 divide-accentM w-11/12`}>
      {mapCategories}
    </div>
  );
}

export default CategoriesList;