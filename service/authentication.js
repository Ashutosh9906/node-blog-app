const dotenv = require("dotenv");
const JWT = require("jsonwebtoken");
dotenv.config();

function CreateTokenForUser(user) {
    const payload = {
        //fullName: fullName,
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
    }
    //console.log(process.env.SECRET);
    //console.log("Payload : ", payload);
    const token = JWT.sign(payload, process.env.SECRET);
    return token;
};

function validateToken(token) {
    try {
        const payload = JWT.verify(token, process.env.SECRET);
        return payload;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    CreateTokenForUser,
    validateToken,
}
