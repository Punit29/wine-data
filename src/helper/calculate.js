export function calculateStats(data, type) {
  // Create an object to store types values for each alcohol class
  const alcoholClassTypes = {};

  // Iterate through the data array
  data.forEach((entry) => {
    const alcoholClass = entry["Alcohol"];
    const types = parseFloat(entry[type]);

    // If the alcohol class is not already in the object, initialize it
    if (!alcoholClassTypes[alcoholClass]) {
      alcoholClassTypes[alcoholClass] = [];
    }

    // Add types value to the array for this alcohol class
    alcoholClassTypes[alcoholClass].push(types);
  });

  // Calculate mean, median, and mode for types for each alcohol class
  const statsByAlcoholClass = {};
  Object.keys(alcoholClassTypes).forEach((alcoholClass) => {
    const typesArray = alcoholClassTypes[alcoholClass];

    // Mean calculation
    const mean =
      typesArray.reduce((sum, val) => sum + val, 0) / typesArray.length;

    // Median calculation
    const sortedTypes = typesArray.slice().sort((a, b) => a - b);
    const median =
      sortedTypes.length % 2 === 0
        ? (sortedTypes[sortedTypes.length / 2 - 1] +
            sortedTypes[sortedTypes.length / 2]) /
          2
        : sortedTypes[Math.floor(sortedTypes.length / 2)];

    // Mode calculation
    const typesCount = {};
    typesArray.forEach((val) => {
      typesCount[val] = (typesCount[val] || 0) + 1;
    });
    let mode = null;
    let maxCount = 0;
    Object.keys(typesCount).forEach((key) => {
      if (typesCount[key] > maxCount) {
        mode = parseFloat(key);
        maxCount = typesCount[key];
      }
    });

    statsByAlcoholClass[alcoholClass] = {
      mean: mean,
      median: median,
      mode: mode,
    };
  });

  return statsByAlcoholClass;
}
