import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import PizzaContent from "../components/PizzaBlock/PizzaContent";
import Pagination from "../components/Pagination";
import { AppSearchContext } from "../App";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { categoryIndex, sort, currentPage } = useSelector(
    (state) => state.filter,
  );

  const { searchValue } = React.useContext(AppSearchContext);
  const [items, setPizza] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryIndex > 0 ? `category=${categoryIndex}` : ``;
    const sortBy = sort.sortProperty.replace("-", ``);
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : ``;

    (async function getPizzas() {
      try {
        const response = await axios.get(
          `https://65785c15f08799dc80450b8c.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        );
        setPizza(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
    window.scrollTo(0, 0); // при переходе из другой страницы на <Home/> page проскролить в самое начало
  }, [categoryIndex, sort.sortProperty, searchValue, currentPage]);

  function Pizzas() {
    const skeletonPizzas = [...Array(4).keys()].map((_, index) => (
      <PizzaSkeleton key={index} />
    ));

    const pizzas = items.map((pizza, i) => {
      return <PizzaContent key={i} {...pizza} />;
    });

    return isLoading ? skeletonPizzas : pizzas;
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryIndex} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        <Pizzas />
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </div>
  );
}
