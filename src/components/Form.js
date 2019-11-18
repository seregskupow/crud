import React, { Component } from "react";
import { runInThisContext } from "vm";
import MaskedInput from "react-text-mask";

const initialState = {
  nameError: "",
  lastNameError: "",
  phoneError: "",
  genderError: "",
  ageError: ""
};
export class Form extends Component {
  constructor(props) {
    super(props);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = initialState;
  }
  onFieldChange = event => {
    const parameter = event.target.name;
    const value = event.target.value;
    this.props.setPersonParameter(parameter, value);
  };
  saveToLocalStorage(params) {
    let data = [...this.props.data];
    data.push(params);
    localStorage.setItem("data", JSON.stringify(data));
  }
  validateFields() {
    let nameError = "",
      lastNameError = "",
      phoneError = "",
      genderError = "",
      ageError = "";
      //Phone only check as, I suppose, there can exist two individuals with equal firstname,lastname,gender & age
      let copy = this.props.data.find(item =>item.phone===this.props.params.phone );
      if(copy){
        alert("Such person already exists");
        return false;
      }
    if (!this.props.params.firstName) {
      nameError = "First name is required";
      this.setState({ nameError });
      return false;
    }
    if (!this.props.params.lastName) {
      lastNameError = "Last name is required";
      this.setState({ lastNameError });
      return false;
    }
    if (
      !this.props.params.phone.match(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
      )
    ) {
      phoneError = "Input correct phone number";
      this.setState({ phoneError });
      return false;
    } 
    if (!this.props.params.phone) {
      phoneError = "Phone number is required";
      this.setState({ phoneError });
      return false;
    }
    if (this.props.params.gender === "-") {
      genderError = "Select gender";
      this.setState({ genderError });
      return false;
    }
    if (!this.props.params.age) {
      ageError = "Age is required";
      this.setState({ ageError });
      return false;
    } else if (isNaN(this.props.params.age)) {
      ageError = "Input number value";
      this.setState({ ageError });
      return false;
    } else if (
      parseInt(this.props.params.age) < 1 ||
      parseInt(this.props.params.age) > 150
    ) {
      ageError = "Age must be between 1 and 150 years";
      this.setState({ ageError });
      return false;
    }

    return true;
  }
  handleSubmit = event => {
    event.preventDefault();

    if (this.validateFields()) {
      let id =`f${(+new Date).toString(16)}`;
      let params ={...this.props.params,id};
      console.log(params);
      this.props.saveToStorage(params);
      this.saveToLocalStorage(params);
      this.setState(initialState);
      this.props.clearStore();
    }
    
  };
  render() {
    return (
      <form className="" onSubmit={this.handleSubmit} ref={(el) => this.myFormRef = el}>
        <div class="form-group">
          <label for="exampleInputEmail1">First Name</label>
          <input
            type="text"
            name="firstName"
            maxlength="15"
            value={this.props.params.firstName}
            onChange={this.onFieldChange}
            className={`form-control ${
              this.state.nameError ? "is-invalid animated shake" : null
            }`}
            placeholder="Enter first name"
          />
          {this.state.nameError ? (
            <div style={{ fontSize: 12, color: "red", textAlign: "center" }}>
              {this.state.nameError}
            </div>
          ) : null}
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Last Name</label>
          <input
            type="text"
            name="lastName"
            maxlength="15"
            value={this.props.params.lastName}
            onChange={this.onFieldChange}
            className={`form-control ${
              this.state.lastNameError ? "is-invalid animated shake" : null
            }`}
            id="exampleInputEmail1"
            placeholder="Enter last name"
          />
          {this.state.lastNameError ? (
            <div style={{ fontSize: 12, color: "red", textAlign: "center" }}>
              {this.state.lastNameError}
            </div>
          ) : null}
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Phone</label>
          {/* <input
            type="text"
            name="phone"
            maxlength="15"
            value={this.props.params.phone}
            onChange={this.onFieldChange}
            className={`form-control ${
              this.state.phoneError ? "is-invalid" : null
            }`}
            id="exampleInputEmail1"
            placeholder="Enter phone"
          /> */}
          <MaskedInput
            className={`form-control ${
              this.state.phoneError ? "is-invalid animated shake" : null
            }`}
            name="phone"
            value={this.props.params.phone}
            onChange={(event)=>this.onFieldChange(event)}
            mask={['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} placeholder="(050) 000-0000"
          />
          {this.state.phoneError ? (
            <div style={{ fontSize: 12, color: "red", textAlign: "center" }}>
              {this.state.phoneError}
            </div>
          ) : null}
        </div>
        <div class="form-group">
          <label>Gender</label>
          <select
            className={`form-control form-control md ${
              this.state.genderError ? "is-invalid animated shake" : null
            }`}
            name="gender"
            value={this.props.params.gender}
            onChange={this.onFieldChange}
          >
            <option value="-">not selected</option>
            <option value="F">female</option>
            <option value="M">male</option>
          </select>
          {this.state.genderError ? (
            <div style={{ fontSize: 12, color: "red", textAlign: "center" }}>
              {this.state.genderError}
            </div>
          ) : null}
        </div>
        <div class="form-group">
          <label>Age</label>
          <input
            type="text"
            name="age"
            maxlength="3"
            value={this.props.params.age}
            onChange={this.onFieldChange}
            className={`form-control ${
              this.state.ageError ? "is-invalid animated shake" : null
            }`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your age"
          />
          {this.state.ageError ? (
            <div style={{ fontSize: 12, color: "red", textAlign: "center" }}>
              {this.state.ageError}
            </div>
          ) : null}
        </div>

        <button type="submit" class="btn w-100 btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
