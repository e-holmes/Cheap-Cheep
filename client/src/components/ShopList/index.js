import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";
import List from "../List";




class ShopList extends Component {
  state = {
    Items: []
  };

  componentDidMount() {
    this.loaditem();
  }

  loaditem = () => {
    API.getItem()
      .then(res => this.setState({ Items: res.data }))

      .catch(err => console.log(err));

  };


  render() {
    console.log(this.state.Items);
    return (
      <div>
        <div className="col-8 text-center d-flex justify-content-between">
          <table className="table items-table table-dark-bordered table-hover table-sm m-7">
            <thead>
              <tr>
                <th>Remove</th>
                <th>Item Name</th>
                <th>Lowest Price</th>
                <th>Link</th>
                <th>search Term</th>
              </tr>
            </thead>
            <tbody Items={this.state.Item} >
              {this.state.Items.map(Item => (
                <tr key={Item._id}>
                  <th className="">
                    <button type="button" className=" btn-sm btn btn-outline-danger btn-dark">X</button>
                  </th>
                  <td>{Item.name}</td>
                  <td>{Item.price}</td>
                  <td>{Item.website}</td>
                  <td>{Item.seacrhTerm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    );
  }
}

export default ShopList;