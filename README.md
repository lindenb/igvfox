Controlling **IGV** through mozilla **Firefox** 

## Motivation

An add-on for Firefox Controlling IGV, the **Integrative Genomics Viewer**  ( http://www.broadinstitute.org/igv/ ) , through mozilla Firefox . 

Tested with Firefox 32.0.3 and IGV 2.2.4 .

## Author

Pierre Lindenbaum PhD  @yokofakun 

Institut-du-thorax UMR1087, Nantes, France.



## Compilation

package the firefox add-on **igvfox.xpi**

```bash
$ make igvfox.xpi
```

## Installation

download or compile **igvfox.xpi** and  open-it from a firefox window.


##Setting preferences

in menu 'Add-ons', select the IGVfox plugin and set the host:port of IGV

![PreferencesPanel](https://raw.githubusercontent.com/lindenb/igvfox/master/doc/preferences.jpg)


## Example

There is an example under `test/test01.html`

The html page loads a small javascript code:

```javascript
(...)
IGVFox._dipatchEvent = function(param)
	{
		var event = document.createEvent('CustomEvent');
       		event.initCustomEvent("igvfox@univ-nantes.fr", true, true, param );
       		document.documentElement.dispatchEvent(event); 
	};

IGVFox.goTo = function(position)
	{
	IGVFox._dipatchEvent(position);
	};
(...)
```

this code is called from a HTML page:

```html
<tr>
  <td>rs2229482</td>
  <td>
    <a href="javascript:IGVFox.goTo('chr1:22071831-22071833')">chr1:22071832</a>
  </td>
</tr>
```


![PreferencesPanel](https://raw.githubusercontent.com/lindenb/igvfox/master/doc/screenshot01.png)

<!--
## Resources that have been helpful during the developement of this add-on.

* http://www.broadinstitute.org/igv/PortCommands
* "Adding a New Protocol to Mozilla" http://www.nexgenmedia.net/docs/protocol/
* "Writing a Firefox Protocol Handler" http://mike.kaply.com/2011/01/18/writing-a-firefox-protocol-handler/
* https://developer.mozilla.org/en-US/Firefox/Multiprocess_Firefox/The_message_manager
* https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Content_Scripts
* https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Creating_reusable_modules

-->
