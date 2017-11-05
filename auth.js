var passport =  require("passport");
var {Strategy} = require("passport-jwt");

module.exports = app => {
	const Usuario = app.db.models.Usuario;
	const cfg = app.API.libs.config;
	const strategy = new Strategy({secretOrKey: cfg.jwtSecret}, 
			(payload, done) => {
				Usuario.findById(payload.id)
				.then(usuario => {
					if(usuario){
						return done(null, {
							id: usuario.id,
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