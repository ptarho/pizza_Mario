import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import App from "./App";
import Home from "./pages/Home";
//import Error from "./pages/Error";
//import Cart from "./pages/Cart";
//import FullPizza from "./components/FullPizza";

const Cart = lazy(() => import("./pages/Cart"));
const FullPizza = lazy(() => import("./components/FullPizza"));
const Error = lazy(() => import("./pages/Error"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <Suspense fallback={"Loading..."}>
        <Error />
      </Suspense>
    ),
    children: [
      { path: "", element: <Home /> },
      {
        path: "cart",
        element: (
          <Suspense fallback={"Loading..."}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "pizza/:id",
        element: (
          <Suspense fallback={"Loading..."}>
            <FullPizza />
          </Suspense>
        ),
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
