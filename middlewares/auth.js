require('dotenv').config()

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token, process.env.JWT_SECRET_KEY);
              req.userId = user.id;
              req.email = user.email;
            next();
        } else {
            return res.status(401).json({ error: 'No token provided. Please log in.' });
          }
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}


module.exports = auth;