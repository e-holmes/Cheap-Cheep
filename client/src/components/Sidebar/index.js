import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";
// import InfoCard from "../components/InfoCard"
// import Shoplist from "../components/ShopList";




class Saved extends Component {
  state = {
    Lists: []
  };

  componentDidMount() {
    this.loadlist();
  }

  loadlist = () => {
    API.getList()
      .then(res => this.setState({ Lists: res.data }))

      .catch(err => console.log(err));

  };


  render() {
    // console.log(this.state.Lists);
    return (
          <table className="table table-success table-lists table-hover table-sm">
            <thead>
              <tr className="table-light">
                <th>Your Lists</th>
              </tr>
            </thead>
            <tbody Lists={this.state.Lists} >
                {this.state.Lists.map(List => (
                  <tr key={List._id}>
                      <td>{List.listName}</td>
                  </tr>
                ))}
            </tbody>
          </table>
      
    )
  }
}

export default Saved;