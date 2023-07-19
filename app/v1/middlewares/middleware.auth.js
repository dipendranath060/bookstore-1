const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports=(req, res, next) =>{
    // auth middleware
     const token= req.headers['authorization']?.split(" ")[1];// give space between " " because it is array like [authorizatin, token] ==> space gets token by help of array otherwise it converts array like "a","u"...etc.
     if(!token) return res.status(400).json({
         status: "Fail",
         message: "Access denied. No token provided.."
     });
 
     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
         if(err)
         return res.status(401).json({
             status: "Fail",
             message: "Invalid Token.."
         });
         req.user = decoded;
         next();
     });
     
 };