import React, { Component } from "react";
import { runInThisContext } from "vm";

export class Form extends Component {
  constructor(props) {
    super(props);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onFieldChange = event => {
    const parameter = event.target.name;
    const value = event.target.value;
    this.props.setPersonParameter(parameter, value);
  };
  saveToLocalStorage(params) {
    let data =[...this.props.data];
    data.push(params);
    localStorage.setItem("data", JSON.stringify(data));
  }
  handleSubmit = () => {
    console.log("ggg")
    console.log(this.props.data);
    this.props.saveToStorage(this.props.params);
    this.saveToLocalStorage(this.props.params)
    
    
  };
  render() {
    return (
      <form className="">
        <div class="form-group">
          <label for="exampleInputEmail1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={this.props.params.firstName}
            onChange={this.onFieldChange}
            class="form-control need-validation"
            aria-describedby="emailHelp"
            placeholder="Enter first name"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={this.props.params.lastName}
            onChange={this.onFieldChange}
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter last name"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Phone</label>
          <input
            type="text"
            name="phone"
            value={this.props.params.phone}
            onChange={this.onFieldChange}
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter phone"
          />
        </div>
        <div class="form-group">
          <label>Gender</label>
          <select
            class="form-control form-control-md"
            name="gender"
            value={this.props.params.gender}
            onChange={this.onFieldChange}
          >
            <option value="M">male</option>
            <option value="F">female</option>
            <option value="-">another</option>
          </select>
        </div>
        <div class="form-group">
          <label>Age</label>
          <input
            type="text"
            name="age"
            value={this.props.params.age}
            onChange={this.onFieldChange}
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>

        <button
          type="button"
          onClick={this.handleSubmit}
          class="btn btn-primary"
        >
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
