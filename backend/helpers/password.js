const bcrypt = require("bcrypt")

//generate password function
async function hashPassword(pwdString) {
    const salt = await bcrypt.genSalt(6);
    const pwd = await bcrypt.hash(pwdString, salt)
    return pwd;
}
//validate password
async function comparePassword(password, hashedPassword) {
    const validPwd = await bcrypt.compare(password, hashedPassword)
    return validPwd;
}

module.exports = { hashPassword, comparePassword }