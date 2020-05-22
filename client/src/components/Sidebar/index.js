import React from "react";
import "./style.css";






function Sidebar(props) {

  return (
    <table className="table table-success table-lists table-hover table-sm">
      <thead>
        <tr className="table-light">
          <th>Your Lists</th>
        </tr>
      </thead>
      <tbody>
          {props.children}
      </tbody>
    </table>
  )
}


export default Sidebar;