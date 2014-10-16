/*
The MIT License (MIT)

Copyright (c) 2014 Pierre Lindenbaum

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


History:
* 2014 creation

*/

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

function test_preferences()
	{
console.log("HOST :"+require('sdk/simple-prefs').prefs['igvhost']);
console.log("PORT :"+require('sdk/simple-prefs').prefs['igvport']);
}

exports["test main"] = function(assert) {
  assert.pass("unit test running!");
  test_rcp(assert);
  test_preferences();
};

exports["test main async"] = function(assert, done) {
  assert.pass("async test running");
  done();
};




require("sdk/test").run(exports);
