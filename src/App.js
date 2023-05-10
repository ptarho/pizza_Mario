import React from "react";

import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import Pizza from "./components/Pizza";

import pizzas from "./pizzas.json"
console.log(pizzas)

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">All pizzas</h2>
            <div className="content__items">

              {pizzas.map(obj => {
                return <Pizza key={obj.id} {...obj}/>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
