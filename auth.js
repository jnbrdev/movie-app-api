const jwt = require("jsonwebtoken")
require('dotenv').config()


module.exports.createAccessToken = (user) =>{
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }

    return jwt.sign(data, process.env.JWT_SECRET_KEY, {})
}

module.exports.verify = (req, res, next) =>{
    console.log(req.headers.authorization);
    let token = req.headers.authorization
    if(typeof token === "undefined"){
        return res.send({auth: "Failed. No Token"})
    }else{
        console.log(token)
        token = token.slice(7, token.length)
        console.log(token)

        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decodeToken){
            if(err){
                return res.send({
                    auth: "Failed",
                    message: err.message
                })
            }else{
                console.log("result from verify method")
                console.log(decodeToken)

                req.user = decodeToken;

                next()
            }
        })
    }
}

module.exports.verifyAdmin = (req, res, next) =>{
    console.log(req.user);
    if(req.user.isAdmin){
        next()
    }else{
        return res.status(403).send({
            auth: "Failed",
            message: "Action Forbidden"
        })
    }
}

module.exports.errorHandler = (err, req, res, next) => {

	console.error(err);

	const errorMessage = err.message || 'Internal Server Error';

	res.json({
		error: {
			message: errorMessage,
			errorCode: err.code || 'SERVER_ERROR',
			details: err.details || null
		}
	})
}