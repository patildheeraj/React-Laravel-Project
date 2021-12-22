import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  async function addProduct() {
    console.log(name, file, price, description);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);

    let result = await fetch("http://localhost:8000/api/addproduct", {
      method: "POST",
      body: formData,
    });
    console.log(result);
    navigate("/");
  }

  return (
    <>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <br />
        <h1>Add Product Page</h1>
        <br />
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />
        <br />
        <input
          type="file"
          className="form-control"
          placeholder="Product Image"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <input
          type="text"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Product Price"
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button className="btn btn-outline-primary" onClick={addProduct}>
          Add Product
        </button>
      </div>
    </>
  );
};

export default AddProduct;
