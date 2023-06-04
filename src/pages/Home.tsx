import React from "react";
import { useSearchParams } from "react-router-dom";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pizza from "../components/Pizza";
import Skeleton from "../components/Pizza/Skeleton";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

import { useSelector } from "react-redux";
import { changePage, pageSelector } from "../redux/slices/pageSlice";
import { changeCategory, categorySelector } from "../redux/slices/filterSlice";
import { changeSort, sortSelector } from "../redux/slices/sortSlice";
import { changeMount, mountSelector } from "../redux/slices/mountSlice";
import { fetchPizzas, pizzaSelector } from "../redux/slices/pizzaSlice";
import { searchSelector } from "../redux/slices/searchSlice";
import { useAppDispatch } from "../redux/store";
//import { pizzaInfo } from "../@types/pizzaInfo";

function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const isSearchParams = React.useRef(false);

  const dispatch = useAppDispatch();
  const isMounted = useSelector(mountSelector);
  const searchValue = useSelector(searchSelector);
  const activeCategory = useSelector(categorySelector);
  const sortBy = useSelector(sortSelector);
  const pizzas = useSelector(pizzaSelector);
  const { page } = useSelector(pageSelector);

  const pizzasOnPage = 6;

  const getPizzas = async () => {
    setIsLoading(true);
    console.log("FETCHING");

    dispatch(fetchPizzas({ activeCategory, sortBy, searchValue, pizzasOnPage }));
    if (!searchParams.get("page")) dispatch(changePage(0));

    setIsLoading(false);
    //window.scrollTo(0, 0);
  };

  // if we open app via url with params save them in redux
  React.useEffect(() => {
    if (searchParams.size) {
      const params = Object.fromEntries(searchParams.entries());
      if (params.category) dispatch(changeCategory(params.category));
      if (params.sort) dispatch(changeSort(params.sort));
      if (params.page) dispatch(changePage(Number(params.page) - 1));

      isSearchParams.current = true;
      getPizzas();
    }
  }, []);

  // if there is no params fetch pizzas with default params from redux
  React.useEffect(() => {
    if (!isSearchParams.current) {
      getPizzas();
    }
    isSearchParams.current = false;
  }, [activeCategory, searchValue, sortBy]);

  // if home page was mounted save params in url when they changes
  React.useEffect(() => {
    if (isMounted) {
      const queryString = {
        category: String(activeCategory),
        sort: sortBy,
        page: String(page + 1),
      };
      setSearchParams(queryString);
    } else {
      dispatch(changeMount(true));
    }
  }, [activeCategory, sortBy, page]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <div className="content__header">
        <h2 className="content__title">All pizzas</h2>
        <Search />
      </div>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, i) => {
              return <Skeleton key={i} />;
            })
          : pizzas
              .slice(page * pizzasOnPage, page * pizzasOnPage + pizzasOnPage)
              .map((obj: any) => {
                return <Pizza key={obj.id} {...obj} />;
              })}
      </div>
      <Pagination />
    </div>
  );
}

export default Home;
