var passport =  require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
const Usuario =require("./API/models/Usuario.js");
const cfg = require("./API/libs/config.js");
var params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function() {
	var strategy = new Strategy(params, function(payload, done) {
				Usuario.findById(payload.id_usuario)
				.then(usuario => {
					if(usuario){
						console.log("Autenticado");
						return done(null, {
							id: usuario.id_usuario,
							email: usuario.email
						});
					}
					return done(null, false);
				})
				.catch(error => done(error, null));
			});

	passport.use(strategy);

	return {
		initialize: () => {
			return passport.initialize();
		},
		authenticate: () => {
			return passport.authenticate("jwt", cfg.jwtSession);
		}
	};

};
