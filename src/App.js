import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Protected from "./components/Protected";
import ProductList from "./components/ProductList";
import SearchComponent from "./components/SearchComponent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Protected Cmp={ProductList} />} />
          <Route path="login" exact element={<Login />} />
          <Route path="register" exact element={<Register />} />
          <Route path="add" exact element={<Protected Cmp={AddProduct} />} />
          <Route
            path="search"
            exact
            element={<Protected Cmp={SearchComponent} />}
          />
          <Route
            path="update/:id"
            exact
            element={<Protected Cmp={UpdateProduct} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
