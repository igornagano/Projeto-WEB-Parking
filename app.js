var app = require("express")();
var express = require("express");

app.use(express.static(__dirname + '/public'));

var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res){
	res.sendfile("index.html");//Página que será enviado a informações
	
});

var mySocket;

var SerialPort = require('serialport');
var Readline = SerialPort.parsers.Readline;
var port = new SerialPort('/COM3'); //Porta do Arduino

//Delimita os dados recebidos no Arduino toda vez que tem quebra de linha
var parser = port.pipe(Readline({delimiter: '\r\n'}));

//Evento de Envio de dados para a página WEB
parser.on('data', function(dados){
	io.emit("dadoArduino",{//Nome de Evento
		valor: dados//Parametro de valores enviados
	});
	
});

io.on("connection", function(socket){
	console.log("Conectado!");
});
http.listen(8000, function(){
	console.log("Usuario na pagina");
});