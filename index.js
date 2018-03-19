//import express from "express";
//import consign from "consign";

var app = require("express")();
var express = require("express");
var consign = require("consign");

const PORT = 8000;

app.use(express.static(__dirname + '/public'));



consign()
	.include("API/libs/config.js")
	.then("db.js")
	.then("auth.js")
	.then("API/libs/middlewares.js")
	.then("API/routes")
	.then("API/libs/boot.js")
	.into(app);

app.listen(PORT, () => console.log(" API "));