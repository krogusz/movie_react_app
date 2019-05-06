import React from "react";

const Input = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>
        {props.title}
      </label>
      <div id={props.id}>
        <input
          className="form-control"
          name={props.name}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
