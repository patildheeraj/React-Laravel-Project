/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [data, setData] = useState([]);

  async function deleteProduct(id) {
    let result = await fetch("http://localhost:8000/api/deleteproduct/" + id, {
      method: "DELETE",
    });
    result = await result.json();
    console.log(result);
    fetchData();
  }
  async function fetchData() {
    let result = await fetch("http://localhost:8000/api/productlist");
    result = await result.json();
    setData(result);
    console.log(result);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div className="col-sm-8 offset-sm-2">
        <h1>ProductList Page</h1>
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <img
                    src={`http://localhost:8000/${item.file_path}`}
                    style={{ width: 150, height: 100 }}
                  />
                </td>
                <td>
                  <span
                    className="btn btn-outline-danger"
                    onClick={() => deleteProduct(item.id)}
                  >
                    Delete
                  </span>

                  <Link to={"update/" + item.id}>
                    <span className="btn btn-outline-primary mx-3">Update</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ProductList;
