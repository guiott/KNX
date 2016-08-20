var Device = 
[
				[0x00, 0x00],	//NULL

				[0x0D, 0xD1],	//luce 01 salotto	lato porta
				[0x0D, 0xD9],	//luce 02 salotto	lato finestra
				[0x0E, 0x69],	//presa soggiorno abat jour	
				[0x0D, 0xE1],	//cucina esterno	
				[0x0D, 0xE9],	//luce 01 cucina	principale
				[0x0D, 0xF1],	//luce 02 cucina	top pensili
				[0x0E, 0x19],	//Luce cameretta	CED
				[0x0E, 0x29],	//Luce 01 camera matr.	
				[0x0E, 0x31],	//Luce 02 camera matr.	
				[0x0E, 0x81],	//Luce 03 camera matr.	
				[0x0E, 0x39],	//Luce 01 camera	
				[0x0E, 0x41],	//Luce 02 camera	
				[0x0E, 0x51],	//Luce entrata	ingresso
				[0x0E, 0x21],	//Luce corridoio	disimpegno giorno
				[0x0E, 0x59],	//Luce ingresso	disimpegno notte
				[0x0E, 0x49],	//Luce 02 bagno (N)	bagno notte
				[0x0E, 0x61],	//Luce 01 bagno (G)	bagno giorno
				[0x0E, 0x71],	//Presa vano tecnico	
				
				[0x0B, 0x03],	//scenario Luci OFF
				[0x0B, 0x02],	//scenario Tapparelle SU
				[0x0B, 0x01],	//scenario Tapparelle GIU

]

var DeviceTap = 
[
				[0x00, 0x00],	//NULL

				[0x0D, 0xCA, 0xC9],	//tapparelle salotto	
				[0x0D, 0xBA, 0xB9],	//tapparelle 02 cucina	porta finestra
				[0x0D, 0xC2, 0xC1],	//tapparelle 01 cucina	finestrina
				[0x0D, 0xFA, 0xF9],	//tapparella cameretta	CED
				[0x0E, 0x0A, 0x09],	//tapparella camera matr.	
				[0x0E, 0x12, 0x11],	//tapparella camera	
				[0x0E, 0x02, 0x01],	//tapparelle bagno(N)	bagno notte
				[0x0E, 0x7A, 0x79]	//Tapparella 01 bagno (G)	bagno giorno
]

// ============================================================================

// open a connection to the server:
var socket = io.connect('http://' + location.host);

socket.on('loopBackEvent', function (data) 
{
  //var LB = JSON.parse(data);
  //dsNav.velInt[0] = LB.FLs;
});  
    
socket.on('RxEvent', function (data) 
{ 
  //var RX = JSON.parse(data);
  //LLS.batV[0]=RX.lat;
});  
  
 function Luci(Status) 
 {
	 var List = document.getElementById("LuciList");
	 var Dev = parseInt(List.options[List.selectedIndex].value);
	 KNXaction(Device[Dev],Status, 0x01);
 }

 function Scenari(Status) 
 {
	 var List = document.getElementById("ScenariList");
	 var Dev = parseInt(List.options[List.selectedIndex].value);
	 KNXaction(Device[Dev],Status, 0x02);
 }

 function Tap(Status) 
 {
	 var List = document.getElementById("TapList");
	 var Dev = parseInt(List.options[List.selectedIndex].value);
	 KNXactionTap(DeviceTap[Dev],Status, 0x01);
 }
	
var KNXaction=function(Device, Switch, Count)
{
	var KNX =
	{ 
		'LINE'  : Device[0],
		'DEVICE': Device[1],
		'CMD'	: Switch,
		'COUNT'	: Count,
	}
	socket.emit('message', JSON.stringify(KNX));
	//console.log(KNX);
};

var KNXactionTap=function(Device, Switch, Count)
{
	switch(Switch)
	{
		case 0:
			var KNX =
			{
				'LINE'  : Device[0],
				'DEVICE': Device[1],
				'CMD'	: false,
				'COUNT'	: Count,
			}
			break;
		case 1:
			var KNX =
			{
				'LINE'  : Device[0],
				'DEVICE': Device[1],
				'CMD'	: true,
				'COUNT'	: Count,
			}
			break;
		case 2:
			var KNX =
			{
				'LINE'  : Device[0],
				'DEVICE': Device[2],
				'CMD'	: true,
				'COUNT'	: Count,
			}
			break;
	}
	socket.emit('message', JSON.stringify(KNX));
	//console.log(KNX);
};

function truncate(n) 
{
  return Math[n > 0 ? "floor" : "ceil"](n);
}

function pad(num, places, padChar) 
{
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join(padChar) + num;
}

