import { useContext } from "react";
import CategoriesList from "./components/CategoriesList";
import Header from "./components/Header";
import { StoreContext } from "./contexts/StoreContext";

export default function Home() {
  const { globalState, setGlobalState } = useContext(StoreContext);
  console.log(globalState);

  return (
    <section>
      <Header />

      <CategoriesList />

      <h3>Digite algum termo de pesquisa ou escolha uma categoria.</h3>
    </section>
  )
}