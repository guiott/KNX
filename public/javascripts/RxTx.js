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

  for(var i=0; i<Group.length; i++)
  {

	if(RX.Dest===Group[i][0] & RX.DestDev===Group[i][1])
	{
		var DestLiteral=Group[i][3];
		Tap=false;
		if(RX.Payload===" 81")
		{
			DestStatus="ON&nbsp&nbsp";
		}
		else
		{
			DestStatus="OFF&nbsp";
		}
		break;
	}
  }
   	var TapLitt="";
	var TapStop=true;
	if(Tap)
	{
	  for(var i=0; i<GroupTap.length; i++)
		{ 
			if(RX.Dest===GroupTap[i][0] & RX.DestDev===GroupTap[i][1])
			{
				TapStop=false;
				TapLitt="tapparella ";
				var DestLiteral=GroupTap[i][3];
				if(RX.Payload===" 81")
				{
					DestStatus="GIU&nbsp";
				}
				else
				{
					DestStatus="SU&nbsp&nbsp";
				}
				break;
			}
		}
	}
  
  	if(TapStop)
  	{
  		for(var i=0; i<GroupTap.length; i++)
		{
			if(RX.Dest===GroupTap[i][0] & RX.DestDev===GroupTap[i][2])
			{
				var DestLiteral=GroupTap[i][3];
				DestStatus="STOP ";
				TapLitt="tapparella ";
				break;
			}
		}
  	}
  
  var DestDevLit="";
  for(var i=0; i<Device.length; i++)
  {
	if(RX.DestDev===Device[i][0])
	{
		var DestDevLit=Device[i][1];
		break;
	}
  }
  
  var SendDevLit="";
  for(var i=0; i<Device.length; i++)
  {
	if(RX.SendDev===Device[i][0])
	{
		var SendDevLit=Device[i][1];
		break;
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
	  $("ol").prepend("<li>RX: "+DestStatus+" === "+SendDevLit+" ---> "+TapLitt+" "+DestLiteral+"</li>");
  }
  else if(RX.Prio==="System" | RX.Prio==="Alarm")
  {
	  /*
	  document.getElementById("RXdata").innerHTML =
	  (
		"received:---- "+RX.Prio+" "+RX.DestHex+" ----"+RX.Date
	  );  
	  */
	  $("ol").prepend("<li>RX: "+RX.Prio+" === "+SendDevLit+"  ---> "+DestDevLit+"</li>");
  }
  else
  {
  	//console.log("Not a valid RX");
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
	 KNXaction(Group[Dev],Status, 0x01);
 }

 function Scenari(Status) 
 {
	 var List = document.getElementById("ScenariList");
	 var Dev = parseInt(List.options[List.selectedIndex].value);
	 KNXaction(Group[Dev],Status, 0x02);
 }

 function Tap(Status) 
 {
	 var List = document.getElementById("TapList");
	 var Dev = parseInt(List.options[List.selectedIndex].value);
	 KNXactionTap(GroupTap[Dev],Status, 0x01);
 }
	
var KNXaction=function(Group, Switch, Count)
{
	var KNXact =
	{ 
		'LINE'  : Group[0],
		'DEVICE': Group[1],
		'CMD'	: Switch,
		'COUNT'	: Count,
	}
	socket.emit('message', JSON.stringify(KNXact));
	
	var DestStatus="";
	if(Count<2)
	{
		if(Switch)
		{
			DestStatus = "ON&nbsp&nbsp";
		}
		else
		{
			DestStatus = "OFF&nbsp";
		}
	}
	else
	{
			DestStatus = "GO&nbsp&nbsp";
	}
	/*
	document.getElementById("RXdata").innerHTML =
	(
    	"sent:---- "+Group[3]+" "+DestStatus+" ----"+Date()
    );
    */
	$("ol").prepend("<li>TX: "+DestStatus+" === Console ---> "+Group[3]+"</li>");

	  
	//console.log(KNXact);
};

var KNXactionTap=function(Group, Switch, Count)
{
	var DestStatus="OFF";
		
	switch(Switch)
	{
		case 0:
			var KNXact =
			{
				'LINE'  : Group[0],
				'DEVICE': Group[1],
				'CMD'	: false,
				'COUNT'	: Count,
			}
			DestStatus=" SU&nbsp&nbsp";
			break;
		case 1:
			var KNXact =
			{
				'LINE'  : Group[0],
				'DEVICE': Group[1],
				'CMD'	: true,
				'COUNT'	: Count,
			}
			DestStatus=" GIU&nbsp";
			break;
		case 2:
			var KNXact =
			{
				'LINE'  : Group[0],
				'DEVICE': Group[2],
				'CMD'	: true,
				'COUNT'	: Count,
			}
			DestStatus=" STOP";
			break;
	}
	socket.emit('message', JSON.stringify(KNXact));
	
	$("ol").prepend("<li>TX: "+DestStatus+" === Console ---> tapparella "+Group[3]+"</li>");

	  
	/*
	document.getElementById("RXdata").innerHTML =
	(
    	"sent:---- "+Group[3]+" "+DestStatus+" ----"+Date()
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
