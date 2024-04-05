import React from "react";

const Table = ({ data }) => {
  const classes = Object.keys(data);

  const meanValues = classes.map((cls) => data[cls].mean.toFixed(2));
  const medianValues = classes.map((cls) => data[cls].median.toFixed(2));
  const modeValues = classes.map((cls) => data[cls].mode.toFixed(2));

  return (
    <table>
      <thead>
        <tr>
          <th>Classes</th>
          {classes.map((cls, index) => (
            <th key={index}>Class {cls}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mean</td>
          {meanValues.map((value, index) => (
            <td key={index}>{value}</td>
          ))}
        </tr>
        <tr>
          <td>Mode</td>
          {modeValues.map((value, index) => (
            <td key={index}>{value}</td>
          ))}
        </tr>
        <tr>
          <td>Median</td>
          {medianValues.map((value, index) => (
            <td key={index}>{value}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
