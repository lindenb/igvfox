const { Cc, Ci, Cu } = require("chrome");

var main = require("./main");

function test_rcp(assert)
	{
	var socketFactory = null;
	var socket = null;
	var port=6020;
	try
		{
		var xx2;
		socketFactory = Cc["@mozilla.org/tcp-socket;1"].createInstance(Ci.nsIDOMTCPSocket);
		
		assert.ok(socketFactory!=null,"got socket");
		console.log("## open localhost");
		socket = socketFactory.open('127.0.0.1',port,{"useSecureTransport":false});
		socket.onopen = function(event)
                        {
                        console.log("##callback onopen called. Sending>>>>");
                        socket.send("ATAGCTACGTGCTAGATCGATCT");
                        console.log("## ok Sent DNA");
                        socket.close();
                        }
		socket.ondata = function(event)
			{
			if (typeof event.data === 'string') {
			    console.log('Get a string: ' + event.data);
				  } else {
			    console.log('Get a Uint8Array');
				  }
			};
		console.log("## ok, socket open on port "+port);
		console.log(""+socket.readyState);
		assert.pass("test RCP completed.");
		}
	catch(err)
		{
		console.log("BOUM! "+err );
		assert.error(err);
		}
	finally
		{
		}
	}

exports["test main"] = function(assert) {
  assert.pass("unit test running!");
  test_rcp(assert);
};

exports["test main async"] = function(assert, done) {
  assert.pass("async test running");
  done();
};




require("sdk/test").run(exports);
