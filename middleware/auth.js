const jwt = require('jsonwebtoken');
const secretKey = 'i will become great developer';
function checkToken(req,res,next){
    try{
        let  token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token,secretKey);
            req.userid = user.id;
            console.log('middleware is working req.userid set',req.userid)   
        }else{
            res.status(400).json({
                message: "send a token you front end enginner. just kidding i am front end developer",
                shortMessage: "token not received"
            });
        }
        next();
    }catch(e){
        res.status(400).json({
            message: "authorization failed"
        });
    }
}

module.exports = checkToken;
