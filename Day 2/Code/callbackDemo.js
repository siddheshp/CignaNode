function fetchData() {
    console.log("Fetching data...");
    // setTimeout(() => {
    //     const data = { id: 1, name: "Sample Data" };
    //     function1(null, data,1,2,3);
    // }, 2000);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { id: 1, name: "Sample Data" };
            resolve(data);
        }, 2000);
    });
    //console.log("Data fetched.");
}

fetchData()
    .then((data) => {
        console.log("Data received:", data);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });



// fetchData(() => {
//     // if (error) {
//     //     console.error("Error fetching data:", error);
//     // } else {
//     //     console.log("Data received:", data);
//     // }

// });

