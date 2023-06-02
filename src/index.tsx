import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import App from "./App";
import Error from "./pages/Error/Error";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import FullPizza from "./components/FullPizza";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "pizza/:id",
        element: <FullPizza />,
      },
    ],
  },
]);
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
