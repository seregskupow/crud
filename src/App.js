import React, { Component } from "react";
import SS from "./components/ss";

import Form from "./components/Form";
import Table from "./components/Table";
import { connect } from "react-redux";
import { setPersonParameter } from "./store/action/actions";
import { saveToStorage } from "./store/action/saveToStorage";
import { getFromLS } from "./store/action/getFromLS";

class App extends Component {
  constructor(props) {
    super(props);
    this.getFromLocalStorage = this.getFromLocalStorage.bind(this);
  }

  getFromLocalStorage() {}
  componentDidMount() {
    if (localStorage.getItem("data")) {
      this.props.getFromLS(JSON.parse(localStorage.getItem("data")));
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    console.log(this.props.data);
    return (
      <div className="container mt-5">
        <div className="row justify-content-between">
          <div className="col-3">
            <Form
              params={this.props.params}
              setPersonParameter={this.props.setPersonParameter}
              saveToStorage={this.props.saveToStorage}
              data={this.props.data}
              saveToLocalStorage={this.saveToLocalStorage}
            />
          </div>
          <div className="col-8">
            <Table data={this.props.data} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    params: state.person.params,
    data: state.storage.data
  };
};
const mapDispatchToProps = {
  setPersonParameter,
  saveToStorage,
  getFromLS
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
