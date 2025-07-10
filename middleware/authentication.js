const { validateToken } = require("../service/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        console.log("printing token : ",tokenCookieValue);
        if (!tokenCookieValue){
            next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            next();
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = {
    checkForAuthenticationCookie,
}