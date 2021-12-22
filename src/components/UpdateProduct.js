import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const param = useParams();
  const navigate = useNavigate();
  console.log("param", param.id);
  const [datas, setDatas] = useState([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  async function updateDetail(id) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);

    let result = await fetch(
      "http://localhost:8000/api/updateproduct/" + id + "?_method=PUT",
      {
        method: "POST",
        body: formData,
      }
    );
    console.log(result);
    alert("data has been updated");
    navigate("/");
  }

  useEffect(async () => {
    let result = await fetch("http://localhost:8000/api/product/" + param.id);
    result = await result.json();
    setDatas(result);
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setDescription(result.description);
    setFile(result.file_path);
  }, []);
  return (
    <>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <h1>Update Product</h1>
        <br />
        <input
          type="text"
          defaultValue={datas.name}
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          defaultValue={datas.price}
          className="form-control"
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <input
          type="text"
          defaultValue={datas.description}
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />{" "}
        <input
          type="file"
          defaultValue={datas.file_path}
          className="form-control"
          onChange={(e) => setFile(e.target.file[0])}
        />
        <br />
        <img
          style={{ width: 150, height: 100 }}
          className="form-control"
          src={"http://localhost:8000/" + datas.file_path}
        />
        <br />
        <button className="btn btn-info" onClick={() => updateDetail(datas.id)}>
          Update Product
        </button>
      </div>
    </>
  );
};

export default UpdateProduct;
