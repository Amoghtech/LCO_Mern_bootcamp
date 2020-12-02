import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";

const AddCategory = () => {
  const [name, setName] = useState("initialState");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3 " to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead"> Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          placeholder=" For Ex. Summer"
        />
        <button className="btn btn-outline-info"> Create Category</button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category here."
      description="Add a new category for new T-shirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="colmd-8 offset-2">
          {myCategoryForm()} {goBack()}
        </div>
      </div>
    </Base>
  );
};
export default AddCategory;
