import React from "react";
import axios from "axios";
import qs from "qs"
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pizza from "../components/Pizza";
import Skeleton from "../components/Pizza/Skeleton";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

import { useDispatch, useSelector } from "react-redux";
import { changePage, changePageAmount } from "../redux/slices/pageSlice";
import { changeCategory } from "../redux/slices/filterSlice";
import { changeSort } from "../redux/slices/sortSlice";

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isSearchParams = React.useRef(false)
  const isMounted = React.useRef(false)

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.search.value);
  const activeCategory = useSelector((state) => state.filter.value);
  const sortBy = useSelector((state) => state.sort.value);
  const { page } = useSelector((state) => state.page);

  const pizzasOnPage = 6;

  const fetchPizzas = () => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/?title=${searchValue}&category=${activeCategory}&sortBy=${sortBy}`
      )
      .then((res) => {
        // delay to display skeletons, remove in production build
        //console.log(res);
        setTimeout(() => {
          dispatch(changePageAmount(Math.ceil(res.data.length / pizzasOnPage)));
          dispatch(changePage(0));
          setPizzas(res.data);
          setIsLoading(false);
        }, 700);
      });
      window.scrollTo(0, 50);
  }

  //console.log(sortBy)
  // if we open app via url with params save them in redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      console.log("PARAMS IS HERE")
      dispatch(changeSort(params.sort))
      dispatch(changeCategory(params.category))
      dispatch(changePage(params.page - 1))
      

      isSearchParams.current = true
    }
  }, [])
  
  // if there is no params fetch pizzas with default params from redux
  React.useEffect(() => {
    if (!isSearchParams.current) {
      fetchPizzas()
    }
    isSearchParams.current = false
  }, [activeCategory, searchValue, sortBy]);

  // if home page was mounted save params in url when they changes
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category: activeCategory,
        sort: sortBy,
        page: page + 1,
      })
      navigate(`?${queryString}`)
      console.log(queryString)
    } else {
      isMounted.current = true
    }
  }, [activeCategory, sortBy, page])

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
              .map((obj) => {
                return <Pizza key={obj.id} {...obj} />;
              })}
      </div>
      <Pagination />
    </div>
  );
}

export default Home;
