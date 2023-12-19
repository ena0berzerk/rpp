import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, { menu } from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import PizzaContent from "../components/PizzaBlock/PizzaContent";
import Pagination from "../components/Pagination";
import { AppSearchContext } from "../App";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

export default function Home() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { categoryIndex, sort, currentPage } = useSelector(
    (state) => state.filter,
  );

  const { searchValue } = React.useContext(AppSearchContext);

  const [items, setPizza] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = categoryIndex > 0 ? `category=${categoryIndex}` : ``;
    const sortBy = sort.sortProperty.replace("-", ``);
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : ``;

    axios
      .get(
        `https://65785c15f08799dc80450b8c.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setPizza(res.data);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = menu.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0); // при переходе из другой страницы на <Home/> page проскролить в самое начало

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryIndex, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryIndex,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryIndex, sort.sortProperty, currentPage]);

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
