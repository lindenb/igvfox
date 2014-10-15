var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

var pageWorker = pageMod.PageMod({
  include: ["*","file://*"], // https://forums.mozilla.org//viewtopic.php?f=27&p=30079&sid=eaf31e85683a806a96b5d096b95951f7
  contentScriptFile: self.data.url("igvapi.js"),
  onAttach: function(worker)
	{
	console.log("on aatch called #####################");// https://github.com/Rik/longdesk/blob/77001c520487b39ce3288e17762b5ba4eccbb612/lib/main.js
	worker.on('message', function(message) {
console.log("RECEIVED MESSAGE FROM CALLER!!!");
for(k in message) 
  console.log("message.["+k+"]"+message[k] );
	});
	}
});


function xlistener(message) {
  console.log(message.name);
  console.log(message.sync);
  console.log(message.data);
  console.log(message.target);
  console.log(message.objects);
}




