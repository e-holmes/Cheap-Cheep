import React from "react";
import "./style.css";


function ShopList(props) {

  return (
    <div className="row mt-4 text-center d-flex justify-content-between">
      <table className="m-4 table table-light items items-table table-bordered table-hover table-sm m-7">
        <thead>
          <tr>
            <th>Remove</th>
            <th>Item Name</th>
            <th>Lowest Price</th>
            <th>Link</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {props.children}
        </tbody>
      </table>

    </div>
  );
}

export default ShopList;