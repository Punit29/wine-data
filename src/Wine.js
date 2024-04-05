import React from "react";
import data from "./Wine-Data.json";
import { calculateStats } from "./helper/calculate";
import Table from "./component/Table";

const Wine = () => {
  const flavanoidsData = calculateStats(data, "Flavanoids");

  const calculateGamma = data.map((item) => ({
    ...item,
    Gamma: (item["Ash"] * item["Hue"]) / item["Magnesium"],
  }));

  const gammaData = calculateStats(calculateGamma, "Gamma");

  return (
    <div className="table-wrapper">
      <div>
        Flavanoids
        <Table data={flavanoidsData} />
      </div>
      <div>
        Gamma
        <Table data={gammaData} />
      </div>
    </div>
  );
};

export default Wine;
