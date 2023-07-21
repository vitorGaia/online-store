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
        className="text-lg font-normal tracking-wide text-gray-400 h-9 rounded-sm"
      >
      {category.name}
      </button>
    </label>
  ));

  return (
    <div className={`${activeSearch ? 'flex flex-col' : 'hidden'} w-5/6 pb-4`}>
      {mapCategories}
    </div>
  );
}

export default CategoriesList;