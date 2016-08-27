Using the hardware and knowledge base got from this site:
http://guidopic.altervista.org/alter/knxgate.html
I slightly modified the original circuit based on Microchip PIC 18f26k80 8 bit MCU, adding just the power supply from 28V KNX bus and isolating the serial line with optocouplers.
This board has been interfaced through the serial line with Ubuntu 14.04 installed on a Cubieboard2 SBC.
On the SBC runs node.js 4.4.7 LTS as application server with the appropriate modules. The GUI is developed in HTML5 and it's connected to the application server using websockets. The GUI, published from the SBC itself, has been tested on different browsers, included ones running on iOS and Android.
It's very simple and must be intended as a starting point for a more sophisticated interface. This job derives from the studies done for another interface:
http://www.guiott.com/Lino/HLS/LinoConsolePage.htm
and more information about it can be obtained on those pages.

This software has been used also as a Konnex bus sniffer to understand how to compose the KNX telegrams to control devices of different kind and scenarios too.

A dusk and dawn calculator scripts has been added in order to possibly use the system as a twilight switch too.
courtesy of: 
http://www.renatoweb.it/sole.htm

More details on:
http://www.guiott.com/KNX/

Any information about KNX can be obtained on the Net were a lot of pages are available.
Information about PIC firmware can be obtained from the original project site.

Any contribution will be appreciated.


![Alt text](https://github.com/guiott/KNX/blob/master/KNX_GUI_example.png?raw=true "GUI example")