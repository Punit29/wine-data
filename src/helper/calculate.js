export function calculateStats(data, type) {
  // Create an object to store types values for each alcohol class
  const alcoholClassFlavanoids = {};

  // Iterate through the data array
  data.forEach((entry) => {
    const alcoholClass = entry["Alcohol"];
    const types = parseFloat(entry[type]);

    // If the alcohol class is not already in the object, initialize it
    if (!alcoholClassFlavanoids[alcoholClass]) {
      alcoholClassFlavanoids[alcoholClass] = [];
    }

    // Add types value to the array for this alcohol class
    alcoholClassFlavanoids[alcoholClass].push(types);
  });

  // Calculate mean, median, and mode for types for each alcohol class
  const statsByAlcoholClass = {};
  Object.keys(alcoholClassFlavanoids).forEach((alcoholClass) => {
    const flavanoidsArray = alcoholClassFlavanoids[alcoholClass];

    // Mean calculation
    const mean =
      flavanoidsArray.reduce((sum, val) => sum + val, 0) /
      flavanoidsArray.length;

    // Median calculation
    const sortedFlavanoids = flavanoidsArray.slice().sort((a, b) => a - b);
    const median =
      sortedFlavanoids.length % 2 === 0
        ? (sortedFlavanoids[sortedFlavanoids.length / 2 - 1] +
            sortedFlavanoids[sortedFlavanoids.length / 2]) /
          2
        : sortedFlavanoids[Math.floor(sortedFlavanoids.length / 2)];

    // Mode calculation
    const flavanoidsCount = {};
    flavanoidsArray.forEach((val) => {
      flavanoidsCount[val] = (flavanoidsCount[val] || 0) + 1;
    });
    let mode = null;
    let maxCount = 0;
    Object.keys(flavanoidsCount).forEach((key) => {
      if (flavanoidsCount[key] > maxCount) {
        mode = parseFloat(key);
        maxCount = flavanoidsCount[key];
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