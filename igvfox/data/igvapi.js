window.addEventListener("mousedown", function(event) {
  console.log("igvapi.js: "+event);
  self.postMessage("HelloWorld from IGVAPI");
  console.log("message posted");
}, false);


console.log("OKKKKKKKKKKKKKKKKKKK");
