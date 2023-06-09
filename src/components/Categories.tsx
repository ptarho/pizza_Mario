import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { categorySelector, changeCategory } from "../redux/slices/filterSlice";
import { changePage } from "../redux/slices/pageSlice"

export const Categories = () => {
  const categories = ["All", "Meat", "Vegetarian", "Spicy", "With seafood"];

  const activeCategory = useSelector(categorySelector)
  const dispatch = useDispatch()

  return (
    <div className="categories">
      <ul>
        {categories.map((e, index) => {
          return <li key={index} onClick={() => {
            dispatch(changeCategory(index)) 
            dispatch(changePage(0))
          }} className={activeCategory === index ? "active" : undefined}>{e}</li>;
        })}
        
      </ul>
    </div>
  );
}


