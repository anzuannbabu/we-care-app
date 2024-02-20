const jwt = require('jsonwebtoken');

//this should a certificate to ensure the maximum security of the token
const JWT_SIGNING_KEY = "LKJASBDHFBLJABSDJFHBLJHKBASDFHSABLkjhblnkjdsflkjsdh86787698759786897bjkhbvkshdfv";

// This funtion is middleware. 
function verifyToken(req, res, next) {
    try {
        const bearerHeader = req.headers['authorization'];
        // console.log("token", bearerHeader)
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];
            req.token = bearerToken;

            //decode the details here
            req.user = JSON.parse(atob(bearerHeader.split(".")[1]) || "{}")?.user || {};
            console.log(req.user)


            //veriufy token here
            console.log("to be veirifed", bearerToken)
            jwt.verify(bearerToken, JWT_SIGNING_KEY, (error, authData) => {
                if (error) {
                    console.log("Failed to verify signature")
                    return res.status(401).json({
                        message: "Access Denied",
                        error: error
                    })
                } else {
                    console.log("Access token verified")
                    next();
                }
            })


        }
        else {
            res.status(401).json({
                message: "Access Denied"
            })
        }
    }
    catch {
        res.status(401).json({
            message: "Access Denied",
            error: "Internal Server Error"
        })
    }
}

module.exports = { verifyToken, JWT_SIGNING_KEY };