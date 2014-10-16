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
function IGVFox()	
	{
	}

IGVFox._dipatchEvent = function(param)
	{
	try
		{
		var event = document.createEvent('CustomEvent');
       		event.initCustomEvent("igvfox@univ-nantes.fr", true, true,
			);
       		document.documentElement.dispatchEvent(event); 
		}
	catch(err)
		{
		console.log("Error: "+err);
		}
	};

IGVFox.goTo = function(args)
	{
	switch(args.length)
		{
		case 0: return;
		case 1:
			{
			var s= args[0];
			var colon= s.indexOf(':');
			if(colon==-1) return;
			var hyphen= s.indexOf('-');
			if(hyphen< colon)
				{
				IGVFox.goTo(
					s.substring(0,colon) ,
					s.substring(colon+1)
					);
				}
			else
				{
				IGVFox.goTo(
					s.substring(0,colon) ,
					s.substring(colon+1,hyphen),
					s.substring(hyphen+1),
					);
				}
			break;
			}
		case 2:
			{
			IGVFox.goTo(args[0],args[1],args[1]);
			break;
			}
		default:
			{
			IGVFox._dipatchEvent({"chrom": args[0] ,"start":args[1],"end":args[2]});
			}
		}
	
	};

