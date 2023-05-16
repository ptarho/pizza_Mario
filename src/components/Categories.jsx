import React from "react";

function Categories({active, setActive}) {
  
  const categories = ["All", "Meat", "Vegetarian", "Closed", "Spicy", "Grill"];

  return (
    <div className="categories">
      <ul>
        {categories.map((e, index) => {
          return <li key={index} onClick={() => setActive(index)} className={active === index ? "active" : undefined}>{e}</li>;
        })}
        
      </ul>
    </div>
  );
}

export default Categories;
