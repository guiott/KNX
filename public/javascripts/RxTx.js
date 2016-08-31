var Device = 
[
				[0x00, 0x00, 0x00, ""],							//NULL

				[0x0D, 0xD1, 0x00, "Salone Luci SX"],			//luce 01 salotto	lato porta
				[0x0D, 0xD9, 0x00, "Salone Luci DX"],			//luce 02 salotto	lato finestra
				[0x0E, 0x69, 0x00, "Salone Abatjour"],			//presa soggiorno abat jour	
				[0x0D, 0xE1, 0x00, "Balcone"],					//cucina esterno	
				[0x0D, 0xE9, 0x00, "Cucina"],					//luce 01 cucina	principale
				[0x0D, 0xF1, 0x00, "Cucina pensili"],			//luce 02 cucina	top pensili
				[0x0E, 0x19, 0x00, "Laboratorio"],				//Luce cameretta	CED
				[0x0E, 0x29, 0x00, "Letto Luci 1"],				//Luce 01 camera matr.	
				[0x0E, 0x31, 0x00, "Letto Luci 2"],				//Luce 02 camera matr.	
				[0x0E, 0x81, 0x00, "Testata Letto"],			//Luce 03 camera matr.	
				[0x0E, 0x39, 0x00, "Camera SX"],				//Luce 01 camera	
				[0x0E, 0x41, 0x00, "Camera DX"],				//Luce 02 camera	
				[0x0E, 0x51, 0x00, "Ingresso"],					//Luce entrata	ingresso
				[0x0E, 0x21, 0x00, "Disimpegno Giorno"],		//Luce corridoio	disimpegno giorno
				[0x0E, 0x59, 0x00, "Disimpegno Notte"],			//Luce ingresso	disimpegno notte
				[0x0E, 0x49, 0x00, "Bagno Notte"],				//Luce 02 bagno (N)	bagno notte
				[0x0E, 0x61, 0x00, "Bagno Giorno"],				//Luce 01 bagno (G)	bagno giorno
				[0x0E, 0x71, 0x00, "Presa TV"],					//Presa vano tecnico	
				
				[0x0B, 0x03, 0x00, "Luci OFF"],					//scenario Luci OFF
				[0x0B, 0x02, 0x00, "Tapparelle Su"],			//scenario Tapparelle SU
				[0x0B, 0x01, 0x00, "Tapparelle Giu"],			//scenario Tapparelle GIU

]

var DeviceTap = 
[
				[0x00, 0x00, 0x00, ""],							//NULL

				[0x0D, 0xCA, 0xC9, "Salone"],					//tapparelle salotto	
				[0x0D, 0xBA, 0xB9, "Cucina porta finestra"],	//tapparelle 02 cucina	porta finestra
				[0x0D, 0xC2, 0xC1, "Cucina finestrina"],		//tapparelle 01 cucina	finestrina
				[0x0D, 0xFA, 0xF9, "Laboratorio"],				//tapparella cameretta	CED
				[0x0E, 0x0A, 0x09, "Camera Letto"],				//tapparella camera matr.	
				[0x0E, 0x12, 0x11, "Camera"],					//tapparella camera	
				[0x0E, 0x02, 0x01, "Bagno notte"],				//tapparelle bagno(N)	bagno notte
				[0x0E, 0x7A, 0x79, "Bagno Giorno"]				//Tapparella 01 bagno (G)	bagno giorno
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
  var RX = JSON.parse(data);

  var Tap=true;
  var DestStatus="OFF";

  for(var i=0; i<Device.length; i++)
  {

	if(RX.Dest===Device[i][0] & RX.DestDev===Device[i][1])
	{
		var DestLiteral=Device[i][3];
		Tap=false;
		if(RX.Payload===" 81")
		{
			DestStatus="ON ";
		}
		else
		{
			DestStatus="OFF";
		}
		break;
	}
  }
   	
	var TapStop=true;
	if(Tap)
	{
	  for(var i=0; i<DeviceTap.length; i++)
		{ 
			if(RX.Dest===DeviceTap[i][0] & RX.DestDev===DeviceTap[i][1])
			{
				TapStop=false;
				var DestLiteral=DeviceTap[i][3];
				if(RX.Payload===" 81")
				{
					DestStatus=" tapparella GIU ";
				}
				else
				{
					DestStatus=" tapparella SU";
				}
				break;
			}
		}
	}
  
  	if(TapStop)
  	{
  		for(var i=0; i<DeviceTap.length; i++)
		{
			if(RX.Dest===DeviceTap[i][0] & RX.DestDev===DeviceTap[i][2])
			{
				var DestLiteral=DeviceTap[i][3];
				DestStatus=" tapparella STOP ";
				break;
			}
		}
  	}
  
  if(RX.Prio==="High Prio" | RX.Prio==="Low Prio")
  {
	  /*
	  document.getElementById("RXdata").innerHTML =
	  (
		"received:---- "+DestLiteral+" "+DestStatus+" ----"+RX.Date
	  );
	  */
	  $("ol").prepend("<li><--- "+DestLiteral+" "+DestStatus+" === "+RX.Date+"</li>");
  }
  else
  {
	  /*
	  document.getElementById("RXdata").innerHTML =
	  (
		"received:---- "+RX.Prio+" "+RX.DestHex+" ----"+RX.Date
	  );  
	  */
	  $("ol").prepend("<li><--- "+RX.Prio+" "+RX.DestHex+" === "+RX.Date+"</li>");
  }
 
  document.getElementById("Sun").innerHTML =
  (
      "Alba ore: "+RX.Dawn+"    Tramonto ore: "+RX.Dusk+" @ Lat: "+RX.Lat+"  Lon: "+RX.Lon+" --- "+decToStr(RX.Hour)+":"+decToStr(RX.Minute)
  );
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
	var KNXact =
	{ 
		'LINE'  : Device[0],
		'DEVICE': Device[1],
		'CMD'	: Switch,
		'COUNT'	: Count,
	}
	socket.emit('message', JSON.stringify(KNXact));
	
	var DestStatus="";
	if(Count<2)
	{
		if(Switch)
		{
			DestStatus = " ON";
		}
		else
		{
			DestStatus = "OFF";
		}
	}
	/*
	document.getElementById("RXdata").innerHTML =
	(
    	"sent:---- "+Device[3]+" "+DestStatus+" ----"+Date()
    );
    */
	$("ol").prepend("<li>---> "+Device[3]+" "+DestStatus+" === "+Date()+"</li>");
	  
	//console.log(KNXact);
};

var KNXactionTap=function(Device, Switch, Count)
{
	var DestStatus="OFF";
		
	switch(Switch)
	{
		case 0:
			var KNXact =
			{
				'LINE'  : Device[0],
				'DEVICE': Device[1],
				'CMD'	: false,
				'COUNT'	: Count,
			}
			DestStatus="tap. SU";
			break;
		case 1:
			var KNXact =
			{
				'LINE'  : Device[0],
				'DEVICE': Device[1],
				'CMD'	: true,
				'COUNT'	: Count,
			}
			DestStatus="tap. GIU";
			break;
		case 2:
			var KNXact =
			{
				'LINE'  : Device[0],
				'DEVICE': Device[2],
				'CMD'	: true,
				'COUNT'	: Count,
			}
			DestStatus="tap. STOP";
			break;
	}
	socket.emit('message', JSON.stringify(KNXact));
	
	$("ol").prepend("<li>---> "+Device[3]+" "+DestStatus+" === "+Date()+"</li>");
	  
	/*
	document.getElementById("RXdata").innerHTML =
	(
    	"sent:---- "+Device[3]+" "+DestStatus+" ----"+Date()
    );
    */
	//console.log(KNXact);
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

function decToHex(Dec)
{//return HEX value 0 padded
	var dataHex = ("00" + (Dec.toString(16))).slice(-2);
	return dataHex.toUpperCase();
}

function decToStr(Dec)
{//return HEX value 0 padded
	var dataStr = ("00" + (Dec.toString(10))).slice(-2);
	return dataStr;
}
