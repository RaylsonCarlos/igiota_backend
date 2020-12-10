const sql = require("./db.js");

const isAuthorized = (userId, token, result) => {
    sql.query(`SELECT * FROM User_Login WHERE User_login.user_Id = ${userId}`, (err, res) => {
        if(err){
            result(err, null);
            return;
        }

        if(res.length && (token == res[0].token)){
            result(null, true);
        } else {
            result(null, false);
        }
    })
};

module.exports = isAuthorized;