var jwt = require("jwt-simple");
var bcrypt = require("bcrypt");
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

module.exports = app => {
	const cfg = app.API.libs.config;
	const Usuario = app.db.models.Usuario;

	app.post("/token", (req, res) => {
		var token;
		if(req.body.email && req.body.senha){
			const email = req.body.email;
			const senha = req.body.senha;
			
			
			Usuario.findOne({where: {email: email}})
			.then(usuario => {

			bcrypt.compare(senha, usuario.senha, function(err, aut) {
				if (aut) {
						const payload = {id_usuario: usuario.id_usuario};
						token = jwt.encode(payload, cfg.jwtSecret);
						return res.json({
							sucesso: "true",
							token: token});
					}
					else{
						return res.json({
							sucesso: "false",
							token: ""});
					}
			});
				
				
			})
			.catch(error => res.sendStatus(401));
		} else{
			res.sendStatus(401);
		}
	});
};