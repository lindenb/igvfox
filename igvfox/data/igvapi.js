*window.addEventListener("addon-message", function(event) {
  console.log("winnnn "+event.detail);
  sendAsyncMessage("my-addon@me.org:my-e10s-extension-message",{details : "Hello adzazdazd" });
}, false);


console.log("OKKKKKKKKKKKKKKKKKKK");
