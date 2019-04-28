import React from "react";

const Input = props => {
  return (
    <div className="form-group">
      <label for={props.name}>
        {props.title}
      </label>
      <div id={props.id}>
        <input
          className="form-control"
          name={props.name}
          type={props.inputType}
          value={props.value}
          onChange={props.handleChange}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
