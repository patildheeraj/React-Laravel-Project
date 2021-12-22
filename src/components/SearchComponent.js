import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Header from "./Header";

const SearchComponent = () => {
  const [data, setData] = useState([]);

  async function findProduct(name) {
    // alert(name);
    let result = await fetch("http://localhost:8000/api/search/" + name);
    result = await result.json();
    setData(result);
    console.log(result);
  }
  return (
    <>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <br />
        <h1>Search Product</h1>
        <input
          type="text"
          className="form-control"
          onChange={(e) => findProduct(e.target.value)}
          placeholder="Product Name"
        />
        <br />
        {/* <button className="btn btn-warning" onClick={() => findProduct(name)}>
          Search
        </button> */}
      </div>
      {data.length > 0 && (
        <div className="col-sm-8 offset-sm-2">
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Description</th>
                <th>Image</th>
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
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default SearchComponent;
