const sql = require("./db.js");

const isAuthorized = (userId, token, result) => {    
    sql.query(`SELECT * FROM User_Login WHERE user_Id = ${userId} AND valid_untill > NOW()`, (err, res) => {
        if(err){
            result(err, null);
            return;
        }

        console.log(res);

        if(res.length && (token == res[0].token)){
            result(null, true);
        } else {
            result(null, false);
        }
    })
};

module.exports = isAuthorized;