window.addEventListener("igvfoxmsg", function(event) {
  console.log("igvapi.js: "+event);
  self.postMessage(event.detail);
  console.log("message posted");
}, false);

function Test1()
	{
	console.log("OK test1");
	}

console.log("OKKKKKKKKKKKKKKKKKKK");
