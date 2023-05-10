import React from "react";

function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const categories = ["All", "Meat", "Vegetarian", "Closed", "Spicy", "Grill"];

  return (
    <div className="categories">
      <ul>
        {categories.map((e, index) => {
          return <li key={index} onClick={() => setActiveCategory(index)} className={activeCategory === index && "active"}>{e}</li>;
        })}
        
      </ul>
    </div>
  );
}

export default Categories;
