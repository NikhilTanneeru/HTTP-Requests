// console.log("One");
// console.log("Two");


// function longTask() {
//     const start = Date.now(); 
//     while (Date.now() - start < 5000) { // Trap or Loop } 
// }

// console.log("One");
// longTask(); 
// console.log("Two");


console.log("One");

setTimeout(() => {
  console.log("Two");
}, 2000); 

console.log("Three");