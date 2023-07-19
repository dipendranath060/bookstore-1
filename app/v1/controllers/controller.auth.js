const User = require('../models/model.user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const user = await User.create({...req.body, role: 'guest'});
        user.sendWelcomeEmail();
        res.status(201).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.login = async(req, res) =>{
    const {email, password} = req.body;

    if(!email || !password)
        return res.status(400).json({
        status: 'fail',
        message: 'Email and password are required..'
        });
    try{
        const user = await User.findOne({email});
        if(!user)
        res.status(400).json({
            status: 'fail',
            message: 'User not found.'
        });
        const isValid = await user.verifyPassword(password); // this method is called by auth model
        // res.send("Login" + isValid);
        if(!isValid)
            res.status(400).json({
            status: 'fail',
            message: 'Invalid password..'
        });

        

        const payload = { //create payload for generate tokens
            sub: user._id,
            email: user.email,
            role: user.role,
            iat: Math.floor(Date.now() / 1000)  // iat means issue at. the time to issue token
        }

        const access_token= await getAccessToken(payload); // generating tokens using above payload
        const refresh_token= await getRefreshToken(payload);
        user.password = undefined;

        // console.log(access_token, refresh_token);
        res.status(200).json({
            status: 'success',
            data:{
                user,
                access_token,// it is for short time like 15 - 20 min after this expire
                refresh_token // it is for long time ..use is access token is created by refresh token 
            }
        });

    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.refreshToken = async(req, res) =>{
    const {refresh_token} = req.body;
    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, async(err, decoded) =>{
        if(err)
        return res.status(401).json({
            status: "Fail",
            message: "Invalid Referesh Token.."
        });
        
        // const payload = {...decoded, iat: Math.floor(Date.now() / 1000)};//... is destructing to take id of access token is same and change the iat
        const payload = { //create payload for generate tokens
            sub: decoded.sub, // when we create paylod for user then all the data fetch by user.id , email etc and after this we decoded this data. now we make playload for refresh then this decoded data can be used like this
            email: decoded.email,
            role: decoded.role,
            iat: Math.floor(Date.now() / 1000)  // iat means issue at. the time to issue token
        }
        const access_token = await getAccessToken(payload);
        res.status(200).json({
            status: "success",
            data: {
                access_token
            }
        });
    });
}

function getAccessToken(payload)
{
    return new Promise((resolve, reject) =>{
        jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'}, (err, token) =>{
            if(err) reject(err);
            resolve(token);
        });
    });
}

function getRefreshToken(payload)
{
    return new Promise((resolve, reject) =>{
        jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '10d'}, (err, token) =>{
            if(err) reject(err);
            resolve(token);
        });
    });
}