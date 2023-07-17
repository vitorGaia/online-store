'use client';
import { getCategories } from "@/services/api";
import { useEffect, useState } from "react";

function CategoriesList() {
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
      <input type="radio" name="category" value={category.id} />
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