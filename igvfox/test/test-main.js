const { Cc, Ci, Cu } = require("chrome");

var main = require("./main");

function test_rcp(assert)
	{
	var sockectFactory = null;
	var socket = null;
	try
		{
		var xx2;
		sockectFactory = Cc["@mozilla.org/tcp-socket;1"].createInstance(Ci.nsIDOMTCPSocket);
		
		assert.ok(sockectFactory!=null,"got socket");
		sockectFactory.ondata = function(event)
			{
			if (typeof event.data === 'string') {
			    console.log('Get a string: ' + event.data);
				  } else {
			    console.log('Get a Uint8Array');
				  }
			};
		sockectFactory.onopen = function(event)
			{
			 console.log("## onopen called");
			}
		console.log("## open localhost");
		sockect = sockectFactory.open('127.0.0.1', 80,{"useSecureTransport":false});
		console.log("## ok, "+ sockect+" open. Sending");
		sockect.send("ATAGCTACGTGCTAGATCGATCT");
		assert.pass("test RCP completed.");
		console.log("## ok Sent DNA");
		}
	catch(err)
		{
		console.log("BOUM! "+err );
		assert.error(err);
		}
	finally
		{
		if(socket!=null) socket.close();
		}
	}

exports["test main"] = function(assert) {
  assert.pass("unit test running!");
};

exports["test main async"] = function(assert, done) {
  test_rcp(assert);
  done();
};




require("sdk/test").run(exports);
