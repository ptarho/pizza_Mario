import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pizza from "../components/Pizza";
import Skeleton from "../components/Pizza/Skeleton";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const searchValue = useSelector((state) => state.search.value);
  const activeCategory = useSelector((state) => state.filter.value);
  const sortBy = useSelector((state) => state.sort.value);
  const order = useSelector((state) => state.sort.order);

  const pizzasOnPage = 6;
  const [page, setPage] = React.useState(0);
  //console.log(pizzas);

  React.useEffect(() => {
    setIsLoading(true);
    console.log(process.env.REACT_APP_SERVER_URL);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/?title=${searchValue}&category=${activeCategory}&sortBy=${sortBy}&order=${order}`
      )
      .then((res) => {
        // delay to display skeletons, remove in production build
        console.log(res);
        setTimeout(() => {
          setPage(0);
          setPizzas(res.data);
          setIsLoading(false);
        }, 700);
      });
    console.log("SCROLL");
    window.scrollTo(0, 50);
  }, [activeCategory, searchValue, sortBy]);

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
      <Pagination
        pageNumber={Math.ceil(pizzas.length / pizzasOnPage)}
        setPage={setPage}
        page={page}
      />
    </div>
  );
}

export default Home;
