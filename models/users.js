const { createHmac, randomBytes } = require("crypto")
const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        require: true,
    },
    profileImageUrl: {
        type: String,
        default: "/images/default.webp"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
}, { timestamps: true });

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

userSchema.statics.matchPassword = async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not Found");

    const salt = user.salt;
    const hashedPassword = user.password;
    
    const userProvidedPassword = createHmac("sha256", salt)
    .update(password) // ✅ this should be the raw password
    .digest("hex");
    
    if (hashedPassword !== userProvidedPassword)
        throw new Error("Invalid Password");
    
    return { ...user.toObject(), password: undefined, salt: undefined };
    
};

const User = model("user", userSchema);
module.exports = User;