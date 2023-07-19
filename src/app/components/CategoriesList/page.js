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
        className="text-lg font-normal tracking-wide h-10"
      >
      {category.name}
      </button>
    </label>
  ));

  return (
    <div className={`${activeSearch ? 'grid' : 'hidden'} divide-y divide-slate-700 w-11/12`}>
      {mapCategories}
    </div>
  );
}

export default CategoriesList;