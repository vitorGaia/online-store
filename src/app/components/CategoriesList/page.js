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
      className="flex justify-center lg:justify-start lg:pl-8"
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
    <div
      className={`${activeSearch ? 'flex flex-col' : 'hidden'} w-5/6 pb-4  lg:flex lg:flex-col lg:fixed lg:top-20 lg:left-0 lg:w-80 lg:bg-gray-800 lg:bg-opacity-20 lg:overflow-y-auto lg:h-full`}
    >
      <p
        className="hidden lg:flex lg:mx-8 lg:items-center lg:text-center lg:text-xl lg:font-bold lg:tracking-wider lg:text-gray-300 lg:mb-2 lg:py-7 lg:border-b-2 lg:border-gray-400"
      >
        Categorias
      </p>
      {mapCategories}
    </div>
  );
}

export default CategoriesList;