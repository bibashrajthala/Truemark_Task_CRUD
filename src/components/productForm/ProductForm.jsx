import React from "react";
import { Button, Form, Input, Select } from "antd";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct } from "../../features/product/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import "./productform.css";

import { categories, status } from "../../constants/constants";

const { TextArea } = Input;
// const { Option } = Select;

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const editMode = Boolean(param.id);

  let id = param.id || null;

  const products = useSelector((state) => state.product.products);
  // console.log(products);

  const initialValue = editMode
    ? products?.find((product) => `${product.id}` === id)
    : { product_name: "", category: "", status: "", description: "" };

  const onFinish = async (values) => {
    console.log("product form values:", values);

    // for product to be edited, id remains same , for new product to be added id is generated.
    // the id of new added product is (id of last product + 1), if there are no any product , then its id is 1
    id = editMode
      ? id
      : products?.length
      ? `${Number(products[products.length - 1]?.id) + 1}`
      : "1";

    const date = moment(new Date()).format("YYYY-MM-DD");
    console.log(date);

    const formData = { ...values, date, id };
    console.log("product form Data", formData);

    editMode
      ? dispatch(editProduct({ id, formData }))
      : dispatch(addProduct(formData));
    navigate("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="form__container">
      <header className="form__header">
        <h2 className="form__header-heading">
          {editMode ? "Edit Product" : "Add Product"}
        </h2>
      </header>

      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ padding: "3rem" }}
        className="form"
        initialValues={initialValue}
      >
        <Form.Item
          name="product_name"
          // label={<label style={{ color: "#587a6f" }}>Product Name</label>}
          label="Product Name"
          rules={[{ required: true, message: "Please input Product Name" }]}
          labelAlign="left"
        >
          <Input placeholder="Product Name" className="form__input" />
        </Form.Item>

        <Form.Item
          name="category"
          // label={<label style={{ color: "#587a6f" }}>Category</label>}
          label="Category"
          rules={[
            { required: true, message: "Please select Product Category!" },
          ]}
          labelAlign="left"
        >
          <Select
            placeholder="Select Product Category"
            options={categories}
            className="form__input"
          />
        </Form.Item>

        <Form.Item
          // label={<label className="label">Status</label>}
          label="Status"
          labelAlign="left"
          rules={[{ required: true, message: "Please select Product Status!" }]}
          name="status"
        >
          <Select
            placeholder="Select Product Status"
            options={status}
            className="form__input"
          />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea
            rows={4}
            placeholder="Description"
            className="form__input"
          />
        </Form.Item>

        <Form.Item className="form__button-container">
          {editMode ? (
            <Button type="primary" htmlType="submit" className="form__button">
              Edit Product
            </Button>
          ) : (
            <Button type="primary" htmlType="submit" className="form__button">
              Add Product
            </Button>
          )}

          <Button
            type="primary"
            className="form__button-cancel"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
