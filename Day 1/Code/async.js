console.log("Start");
setTimeout(() => console.log("Async Task Done"), 1000);

for (let i = 0; i < 5; i++) {
  console.log("Count:", i);
}
console.log("End");
