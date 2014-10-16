## Motivation

An add-on for Firefox Controlling IGV, , the **Integrative Genomics Viewer**  (http://www.broadinstitute.org/igv/) ,  through mozilla Firefox . 

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


## Resources that have been helpful during the developement of this add-on.

* http://www.broadinstitute.org/igv/PortCommands
* "Adding a New Protocol to Mozilla" http://www.nexgenmedia.net/docs/protocol/
* "Writing a Firefox Protocol Handler" http://mike.kaply.com/2011/01/18/writing-a-firefox-protocol-handler/
* https://developer.mozilla.org/en-US/Firefox/Multiprocess_Firefox/The_message_manager
* https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Content_Scripts
* https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Creating_reusable_modules
