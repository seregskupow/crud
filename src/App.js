import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import Form from "./components/Form";
import Table from "./components/Table";
import { connect } from "react-redux";
import { setPersonParameter } from "./store/action/actions";
import { saveToStorage } from "./store/action/saveToStorage";
import { getFromLS } from "./store/action/getFromLS";
import { sortData } from "./store/action/sortData";
import { clearStore } from "./store/action/clearStore";
import TableSearch from "./components/tableSearch";
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
    this.rowHandleClick = this.rowHandleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      sort: "asc",
      currentPage: 0,
      pageSize: 10,
      sortField: "",
      displayData: [],
      deleteId: "",
      active: "",
      filterParam: ""
    };
  }
  handlePageClick({ selected }) {
    this.setState({ currentPage: selected });
  }

  componentDidMount() {
    if (localStorage.getItem("data")) {
      this.props.getFromLS(JSON.parse(localStorage.getItem("data")));
    }
  }

  onSort = sortField => {
    const clonedData = this.props.data;
    const sortType = this.state.sort === "asc" ? "desc" : "asc";
    const orderedData = _.orderBy(clonedData, sortField, sortType);
    this.props.sortData(orderedData);
    this.setState({ sort: sortType, sortField });
  };
  rowHandleClick(event, i) {
    let row = event.target.parentNode;
    this.setState({ deleteId: row.getAttribute("data-id") });
    if (i === this.state.active) {
      this.setState({
        active: null
      });
    } else {
      this.setState({
        active: i
      });
    }
  }
  handleDelete() {
    let id = this.state.deleteId,
      data = this.props.data,
      shouldDelete = data.find(item => item.id === id),
      i = data.indexOf(shouldDelete);
    data.splice(i, 1);
    if (window.confirm("Are you sure to delete row?")) {
      localStorage.setItem("data", JSON.stringify(data));
      this.props.getFromLS(JSON.parse(localStorage.getItem("data")));
    }
  }
  deleteAll() {
    if (window.confirm("Are you sure you want to delete all rows?")) {
      localStorage.clear();
      this.props.getFromLS([]);
    }
  }
  onSearch(search) {
    this.setState({ filterParam: search, currentPage: 0 });
  }
  dataFilter(data) {
    let filterParam = this.state.filterParam;
    console.log(filterParam);
    if (!this.state.filterParam) {
      return data;
    }
    return data.filter(item => {
      let tempSearch = filterParam.toLowerCase();
      if (
        item.firstName.toLowerCase().includes(tempSearch) ||
        item.lastName.toLowerCase().includes(tempSearch) ||
        item.phone.toLowerCase().includes(tempSearch) ||
        item.gender.toLowerCase().includes(tempSearch) ||
        item.age.toLowerCase().includes(tempSearch)
      ) {
        return item;
      }
    });
  }
  render() {
    const pageSize = 10;
    
    let filteredData = this.dataFilter(this.props.data);
    let pageCount = Math.ceil(filteredData.length / pageSize);
    let displayData = _.chunk(filteredData, pageSize)[this.state.currentPage];

    return (
      <div className="container mt-5 p-5">
        <TableSearch onSearch={this.onSearch} />
        <div className="row justify-content-between">
          <div className="col col-12 col-lg-3 col-md-3 col-sm-12 mb-3">
            <Form
              params={this.props.params}
              setPersonParameter={this.props.setPersonParameter}
              saveToStorage={this.props.saveToStorage}
              data={this.props.data}
              saveToLocalStorage={this.saveToLocalStorage}
              clearStore={this.props.clearStore}
            />
          </div>

          <div className="col col-12 col-lg-8 col-md-8 col-sm-12 data-col">
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th onClick={this.onSort.bind(null, "firstName")}>
                      First Name{" "}
                      {this.state.sortField === "firstName" ? (
                        <small>{this.state.sort}</small>
                      ) : null}
                    </th>
                    <th onClick={this.onSort.bind(null, "lastName")}>
                      Last Name{" "}
                      {this.state.sortField === "lastName" ? (
                        <small>{this.state.sort}</small>
                      ) : null}
                    </th>
                    <th onClick={this.onSort.bind(null, "phone")}>
                      Phone
                      {this.state.sortField === "phone" ? (
                        <small>{this.state.sort}</small>
                      ) : null}
                    </th>
                    <th onClick={this.onSort.bind(null, "gender")}>
                      Gender{" "}
                      {this.state.sortField === "gender" ? (
                        <small>{this.state.sort}</small>
                      ) : null}
                    </th>
                    <th onClick={this.onSort.bind(null, "age")}>
                      Age{" "}
                      {this.state.sortField === "age" ? (
                        <small>{this.state.sort}</small>
                      ) : null}
                    </th>
                  </tr>
                </thead>
                {displayData ? (
                  <Table
                    data={displayData}
                    onSort={this.onSort}
                    rowHandleClick={this.rowHandleClick}
                    active={this.state.active}
                    isActive={this.state.isActive}
                  />
                ) : null}
              </table>
            </div>
            <div className="controlls-wrap">
              {this.props.data.length > 10 ? (
                <ReactPaginate
                  className="pagination"
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  pageClassName={"page-item"}
                  activeClassName={"active"}
                  pageLinkClassName={"page-link"}
                  previousLinkClassName={"page-link"}
                  nextLinkClassName={"page-link"}
                  disabledClassName="page-item disabled"
                  forcePage={this.state.currentPage}
                />
              ) : null}
              <div className="delete mr-2">
                <button
                  className="btn btn-danger"
                  onClick={() => this.handleDelete()}
                  disabled={this.state.deleteId ? false : true}
                >
                  Delete
                </button>
              </div>
              <div className="delete-all">
                <button
                  className="btn btn-danger"
                  onClick={() => this.deleteAll()}
                >
                  Delete all
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state.storage.data);
  return {
    params: state.person.params,
    data: state.storage.data
  };
};
const mapDispatchToProps = {
  setPersonParameter,
  saveToStorage,
  getFromLS,
  sortData,
  clearStore
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
