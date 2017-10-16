//import fs from "fs";
//import path from "path";
//import Sequelize from "sequelize";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");

let db = null;

module.exports = () => {
	if(!db) {
		const config = require("./API/libs/config.js");
		const sequelize = new Sequelize(
			"main",
			"",
			"",
			{
				host: 'localhost',
				dialect: 'sqlite',
				storage: 'db_projeto.db3'
			}
		);
		db = {
			sequelize,
			Sequelize,
			models: {}
		};
		const dir = path.join(__dirname, "./API/models");
		fs.readdirSync(dir).forEach(file => {
			const modelDir = path.join(dir, file);
			const model = sequelize.import(modelDir);
			db.models[model.name] = model;
		});
	}
	return db;
};