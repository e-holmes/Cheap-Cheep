import React from "react";
import "./style.css";

function Card(props) {
    return (
        <div>
        <div className="card-body price-font">
          {props.children}
        </div>
      </div>
    )
}

export default Card;