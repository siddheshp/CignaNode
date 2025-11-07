function fetchData() {
  return new Promise((resolve) => {
    console.log("Fetching data...");
    setTimeout(() => resolve("Data fetched successfully!"), 1500);
  });
}

async function displayData() {
  try {
    const data = await fetchData();
    console.log(data);
    console.log("Data processing complete.");
  } catch (error) {
    console.error("Error:", error);
  }
}

displayData();
