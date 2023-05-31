import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import styles from "./FullPizza.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import getPizzaAmount from "../../utils/getPizzaAmount";

function FullPizza() {
  const dispatch = useDispatch()
  const { id } = useParams();
  const typeNames = ["Thin", "Traditional"];
  const [info, setInfo] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const pizzaAmount = getPizzaAmount(Number(id))
  console.log(pizzaAmount)
  const [counter, setCounter] = React.useState(pizzaAmount || 0);

  const addPizza = () => {
    const pizza = {
      id: info.id,
      title: info.title,
      price: info.price,
      imageUrl: info.imageUrl,
      type: typeNames[activeType],
      size: info.sizes[activeSize],
    };
    dispatch(addItem(pizza));
    setCounter((prev) => ++prev);
  };

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/${id}`)
      .then((res) => {
        console.log(res);
        setInfo(res.data);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  }, []);
  console.log(info);

  return !isLoading ? (
    <div className={styles.info}>
      <img className={styles.image} src={info.imageUrl} alt="Pizza" />
      <div className={styles.details}>
        <h4 className={styles.title}>{info.title}</h4>
        <p className={styles.description}>{info.description}</p>
        <div className="pizza-block__selector">
          <ul>
            {info.types?.map((type, index) => {
              return (
                <li
                  key={type}
                  onClick={() => setActiveType(index)}
                  className={index === activeType ? "active" : ""}
                >
                  {typeNames[type]}
                </li>
              );
            })}
          </ul>
          <ul>
            {info.sizes?.map((size, index) => {
              return (
                <li
                  key={size}
                  onClick={() => setActiveSize(index)}
                  className={index === activeSize ? "active" : ""}
                >
                  {size} cm.
                </li>
              );
            })}
          </ul>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">from {info.price  }₴</div>
            <div
              onClick={addPizza}
              className="button button--outline button--add"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Add to cart</span>
              <i>{counter}</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Fetching pizza data...</div>
  );
}

export default FullPizza;
