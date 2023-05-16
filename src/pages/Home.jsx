import React from "react";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pizza from "../components/Pizza";
import Skeleton from "../components/Pizza/Skeleton";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [sortBy, setSortBy] = React.useState("rating");
  const [searchValue, setSearchValue] = React.useState("");

  const pizzasOnPage = 4;
  const [page, setPage] = React.useState(0);
  //console.log(pizzas);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://run.mocky.io/v3/68e5a690-e155-41fd-a02a-b36c03888977")
      .then((res) =>
        setTimeout(() => {
          setPage(0)
          if (activeCategory === 0) {
            setPizzas(
              res.data
                .filter((e) =>
                  e.title.toLowerCase().includes(searchValue.toLowerCase())
                )
                .sort((a, b) => {
                  if (typeof a[sortBy] === "number") {
                    //console.log('number')
                    return a[sortBy] - b[sortBy];
                  } else {
                    //console.log("string")
                    return a[sortBy].localeCompare(b[sortBy]);
                  }
                })
            );
          } else {
            setPizzas(
              res.data
                .filter((e) => e.category === activeCategory)
                .filter((e) =>
                  e.title.toLowerCase().includes(searchValue.toLowerCase())
                )
                .sort((a, b) => {
                  if (typeof a[sortBy] === "number") {
                    //console.log('number')
                    return a[sortBy] - b[sortBy];
                  } else {
                    //console.log("string")
                    return a[sortBy].localeCompare(b[sortBy]);
                  }
                })
            );
          }
          console.log(activeCategory);
          setIsLoading(false);
        }, 500)
      );
    console.log("SCROLL")
    window.scrollTo(0, 50);
  }, [activeCategory, searchValue]);

  React.useEffect(() => {
    setPizzas((prevPizzas) =>
      prevPizzas.slice().sort((a, b) => {
        if (typeof a[sortBy] === "number") {
          return a[sortBy] - b[sortBy];
        } else {
          return a[sortBy].localeCompare(b[sortBy]);
        }
      })
    );
  }, [sortBy]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories active={activeCategory} setActive={setActiveCategory} />
        <Sort {...{ sortBy, setSortBy }} />
      </div>
      <div className="content__header">
        <h2 className="content__title">All pizzas</h2>
        <Search
          value={searchValue}
          setValue={setSearchValue}
          filter={setPizzas}
        />
      </div>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, i) => {
              return <Skeleton key={i} />;
            })
          : pizzas
              .slice(page * pizzasOnPage, page * pizzasOnPage + 4)
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
