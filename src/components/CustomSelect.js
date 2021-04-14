import React from "react";
import Select from "react-select";

let comp = ({ onChange, options, value, className, label }) => {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  return (
    <div className={className}>
      {label}
      <Select
        value={defaultValue(options, value)}
        onChange={(value) => {
          onChange(value);
        }}
        options={options}
      />
    </div>
  );
};

export default comp;
