import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../features/product/productSlice";
import "./productTable.css";
import Spinner from "../Spinner/Spinner";

const ProductTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);
  // console.log(products);

  const [searchField, setSearchField] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    console.log("use Effect 2");
    const newfilteredProducts = products.filter((product) => {
      return (
        product.product_name.toLowerCase().includes(searchField) ||
        product.category.toLowerCase().includes(searchField)
      );
    });
    setFilteredProducts(newfilteredProducts);
  }, [products, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "name",
      render: (_, record) => {
        // console.log(record);

        return (
          <Link to={`/product/${record.id}`} className="table__edit-link">
            {record.product_name}
          </Link>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      // align: "center",
      render: (text) => <div>{text ? text : "--"}</div>,
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => {
        // console.log(record);
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <Link
              to={`/product/${record.id}`}
              className=" table-btn table__edit-btn"
            >
              Edit
            </Link>
            <button
              onClick={() => dispatch(deleteProduct(record.id))}
              style={{ cursor: "pointer" }}
              className="table-btn table__delete-btn"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  if (error) {
    return (
      <section className="error-container">
        <header>
          <h4 className="error">{error}</h4>
        </header>
      </section>
    );
  }
  return (
    <div>
      <div className="table__header">
        <Button
          onClick={() => navigate("/products")}
          className="table__add-button"
        >
          Add New Product
        </Button>
        <Input
          onChange={onSearchChange}
          width="10rem"
          placeholder="Search by Product Name or Category"
          className="table__search"
        />
      </div>

      <div className="table__container">
        {loading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={filteredProducts}
            pagination={false}
            className="table"
            size="middle"
            scroll={{
              x: "calc(700px + 20%)",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductTable;
