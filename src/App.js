import "./App.css";
// import "antd/dist/antd.css";
// import "antd/dist/antd.min.css";
import ProductForm from "./components/productForm/ProductForm";
import ProductTable from "./components/productTable/ProductTable";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "./features/product/productSlice";
import Header from "./components/header/Header";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("use Effect 1");
    dispatch(getProducts());
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProductTable />} />
        <Route path="/product/add" element={<ProductForm />} />
        <Route path="/product/:id" element={<ProductForm />} />
      </Routes>
    </div>
  );
}

export default App;
