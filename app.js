//-------------------------------Server init
 
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// personal modules
var rxTx = require('rxTx.js');
var solehome = require('solehome.js');

var events = require('events');

var exec = require('child_process').exec,
    child;
    
var routes = require('./routes/index');
var users = require('./routes/users');

serialport = require("serialport");	// include the serialport library
SerialPort = serialport; // make a local instance of serial

var app = express();

/* ========Copied from bin/www. required if you want to use the old method without www
 * uncomment this
 * delete www
 * launch with "node app.js instead of npm start
http://stackoverflow.com/questions/24609991/using-socket-io-in-express-4-and-express-generators-bin-www
 * Normalize a port into a number, string, or false.
*/
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

var port = normalizePort(process.env.PORT || '3333');
app.set('port', port);
/*========Copied from bin/www. required if you want to use the old method without www */

var server = require('http').Server(app);
var io = require('socket.io')(server);

/*app.get('/', function(req, res){
  res.sendfile('index.html');
});
*/

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

upTime = Date.now();

//-------------------------------Websocket
// Add a connect listener
var GUItimeout = 5000; // timeout on command receive from GUI web client
GUItime = 0; //current time since last json packet

var KNXtelegram = {LINE : 0, DEVICE: 0, CMD: 0, COUNT: 0};

CLIENT=0;
io.sockets.on('connection', function(client)
{   // Success!  Now listen to messages to be received

	var d = new Date();
	CLIENT=client;
	KNXdecoded = 
	{
		'Date'		: "",
		'Length' 	: "",
		'Prio'		: "",
		'Rep'		: "",
		'SendArea'	: "",
		'SendLine'	: "",
		'SendDev'	: "",
		'DestArea'	: "",
		'DestLine'	: "",
		'DestHex'	: 0,
		'DestDev'	: 0,
		'DestGroup'	: "",
		'Routing'	: "",
		'Count'		: "",
		'Pdu'		: "",
		'Payload'	: "",
		'Check'		: "",
		'Telegram'	: "",
		'Dawn'		: hsorge,
		'Dusk'		: htram,
		'Lat'		: Latit,
		'Lon'		: Longi,
		'Hour'		: d.getHours(),
		'Minute'	: d.getMinutes()
	}
	
	client.emit('RxEvent', JSON.stringify(KNXdecoded));
	
	client.on('message',function(event)
	{ 
	  // console.log("socket"); //debug
      GUItime = Date.now(); // reset timeout counting
      var knxJSON = JSON.parse(event);
      KNXtelegram.LINE=knxJSON.LINE;
      KNXtelegram.DEVICE=knxJSON.DEVICE;
      KNXtelegram.CMD=knxJSON.CMD;
      KNXtelegram.COUNT=knxJSON.COUNT;

   	  rxTx.txTelegram(KNXtelegram.LINE, KNXtelegram.DEVICE, KNXtelegram.CMD, KNXtelegram.COUNT);
      //console.log(KNX.LINE+"  "+ KNX.DEVICE+"  "+ KNX.CMD+"  "+KNX.COUNT);
      //console.log(knxJSON);
	});
	
	client.on('disconnect',function()
	{
		//console.log('Server has disconnected');
	});
});

server.listen(port, function(){
  console.log('listening on *:' + port);
});

//-------------------------------Date
ISODateStringUTC = function(){
  var d = new Date();
  function pad(n, width, z) 
  {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  // function pad(n){return n<10 ? '0'+n : n}
  return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1,2,'0')+'-'
      + pad(d.getUTCDate(),2,'0')+'T'
      + pad(d.getUTCHours(),2,'0')+':'
      + pad(d.getUTCMinutes(),2,'0')+':'
      + pad(d.getUTCSeconds(),2,'0')+'.'
      + pad(d.getMilliseconds(),3,'0')+'Z';
};

//-------------------------------Date
ISODateString = function(){
  var d = new Date();
  function pad(n, width, z) 
  {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  // function pad(n){return n<10 ? '0'+n : n}
  return d.getFullYear()+'-'
      + pad(d.getMonth()+1,2,'0')+'-'
      + pad(d.getDate(),2,'0')+'T'
      + pad(d.getHours(),2,'0')+':'
      + pad(d.getMinutes(),2,'0')+':'
      + pad(d.getSeconds(),2,'0')+'.'
      + pad(d.getMilliseconds(),3,'0')+'CET';
};

//-------------------------------Serial communication
// open the serial port to IMU. Change the name to the name of your port,
// "/dev/tty.usbserial-A700ejZq"    // on Mac
// "/dev/ttyS1"                     // on Aria G25
// "/dev/ttyO1"                     // on BeagleBone Black. 
//		Requires before: 
//					"cd /lib/firmware
//					sudo echo BB-UART1 > /sys/devices/bone_capemgr.*/slots
//					sudo echo BB-UART2 > /sys/devices/bone_capemgr.*/slots


//-------------------------------Serial
portKNX = "/dev/ttyS1",	
bpsKNX = 115200,
dataKNX = 8,
parKNX = 'none',
stopKNX = 1,
flowKNX = false;

RxStatus = 0;   // index for command decoding FSM status
rxErrors = 0;		// RX errors count
	
KnxPort = new SerialPort(portKNX, 
{ 
  parser: serialport.parsers.raw,
  baudrate: bpsKNX,
  dataBits: dataKNX, 
  parity: parKNX, 
  stopBits: stopKNX, 
  rtscts: flowKNX,
  xon: flowKNX,
  xoff: flowKNX,
  xany: flowKNX
});

var KnxOpenFlag = 0;


KnxPort.on('open', function()
{
	console.log('KNX Port open: '+portKNX+
	" bps: "+bpsKNX+
	" data bit: "+dataKNX+
	" parity: "+parKNX+
	" stop bit: "+stopKNX+
	" flow control: "+flowKNX);
	
  	rxTx.KnxInit();

  	knxOpenFlag = 1;
  	
  	solehome.Calcola();// first time, startup calculation
	//console.log(hsorge+"  "+htram+"  @ lat:"+Latit+"  long:"+Longi);		
});

KnxPort.on("data", function (data) 
{ 
	rxTx.KnxPacketDecode(data);
});

KnxPort.on('error', function (data) 
{ // call back on error
//    console.log("LLS comm error" + data);
});

var txTick = 250;
// =====================================idle cycle. executed on event schedule
var knxTx=setInterval(function(){KnxTxTimer();},txTick);

function KnxTxTimer()
{// every txTick ms
   KnxPort.write("@r");		//request next buffer entry from KNXgate
}
// idle cycle. executed on event schedule=====================================



var sunTick = 55000;
// =====================================sun dawn & dusk calculation. executed every 55'
var sun=setInterval(function(){sunTimer();},sunTick);

function sunTimer()
{// every sunTick ms
	var d = new Date();

	if(d.getHours()===0 & d.getMinutes()===0)
	{// get new dawn & dusk data at midnight every day
		solehome.Calcola(); // dawn & dusk calculation
		//console.log("Dawn: "+hsorge+"  Dusk: "+htram+"  @ lat:"+Latit+"  long:"+Longi);
	}
	
	if(CLIENT!=0)
		{
			KNXdecoded = 
			{
				'Date'		: "",
				'Length' 	: "",
				'Prio'		: "",
				'Rep'		: "",
				'SendArea'	: "",
				'SendLine'	: "",
				'SendDev'	: "",
				'DestArea'	: "",
				'DestLine'	: "",
				'DestHex'	: 0,
				'DestDev'	: 0,
				'DestGroup'	: "",
				'Routing'	: "",
				'Count'		: "",
				'Pdu'		: "",
				'Payload'	: "",
				'Check'		: "",
				'Telegram'	: "",
				'Dawn'		: hsorge,
				'Dusk'		: htram,
				'Lat'		: Latit,
				'Lon'		: Longi,
				'Hour'		: d.getHours(),
				'Minute'	: d.getMinutes()
			}
			
			CLIENT.emit('RxEvent', JSON.stringify(KNXdecoded));
		}
}
// idle cycle. executed on event schedule=====================================



