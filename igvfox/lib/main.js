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
const Cr=require("chrome");
var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var preferences = require('sdk/simple-prefs');

function IGVController()
	{
	}

IGVController.prototype={
	debugging : false,
	getHost: function()
		{
		return preferences.prefs["igvhost"];
		},
	getPort: function()
		{
		return parseInt(preferences.prefs["igvport"]);
		},
	debug: function(msg)
		{
		if(this.debugging) { this.log(msg); }
		},
	log: function(msg)
		{
		console.log("[IGVController] "+msg);
		/*Cr.Cc["@mozilla.org/consoleservice;1"].
			getService(Cr.Ci.nsIConsoleService).
			logStringMessage("[IGVController] " +msg);*/
		},
	goTo : function (loc)
		{
		this.debug("goto "+loc);
		this._send("goto "+loc);
		},
	_send: function(msg)
		{
		var socketFactory = null;
		var socket = null;
		var me=this;
		try
			{
			socketFactory = Cr.Cc["@mozilla.org/tcp-socket;1"].createInstance(Cr.Ci.nsIDOMTCPSocket);
			this.debug("got socketFactory");
			this.debug("opening on "+ this.getHost()+":"+this.getPort() );
			socket = socketFactory.open( this.getHost(),this.getPort());
			this.debug("got socket");
			socket.onopen = function(event)
		                {
				me.debug("sending "+msg);
		                socket.send(msg+"\n");
		                socket.close();
		                };
			socket.ondata = function(event)
				{
				if (typeof event.data === 'string')
					{
			   		me.debug(event.data);
				  	} 
				else
					 {
			   		 me.debug('Got a Uint8Array');
				 	 }
				};
			socket.onerror = function(event)
				{
				me.log("[ERROR]" + event.data);
				};
			}
		catch(err)
			{
			this.log("GOT EXCEPTION");
			this.log(err);
			}
		}
	};

IGVController.handler = function(param )
	{
	new IGVController().goTo("2:177189678-177189679");
	};

/* https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Creating_reusable_modules */
exports.IGVController = IGVController;


var pageWorker = pageMod.PageMod({
  include: ["*","file://*"], // https://forums.mozilla.org//viewtopic.php?f=27&p=30079&sid=eaf31e85683a806a96b5d096b95951f7
  contentScriptFile: self.data.url("igvapi.js"),
  onAttach: function(worker)
	{
	worker.on('message', function(message)
		{
		IGVController.handler(message);
		});
	}
});


