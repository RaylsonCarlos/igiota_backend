const sql = require("./db.js");
const crypto = require('crypto');

const Login = function(login) {
    this.email = login.email;
    this.password = login.password;
}

Login.check = (newLogin, result) => {

    sql.query(`SELECT * FROM User WHERE User.email = '${newLogin.email}'`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.length){
            let user = res[0];            
            console.log("found user by email:", user.email);

            //checks the password        
            if(user.password == crypto.createHash('sha256').update(user.email + newLogin.password).digest("base64")){
                
                generateToken(user.id, (error, response) => {
                    if(error) {
                        result(error, null);
                        return;
                    } 
                    
                    result(null, {login_success: true, token: response.token, valid_untill: response.valid_untill, userId: user.id, name: user.name});
                    
                });
                

            } else {
                console.log("failed login attempt: ", user.email)
                result({kind: "wrong password"}, null);
            }

        } else {
            console.log("not found user by email: ", newLogin.email);
            result({kind: "not_found"}, null);
        }
    })

    let generateToken = (userId, result) => {        
        sql.query(`SELECT * FROM User_login 
                    WHERE User_login.user_id = ${userId} AND 
                    User_login.Valid_Untill > NOW()`, (err, res) => {
                        if(err){
                            console.log("error retrieving token: ", err);
                            result(err, null);
                            return;
                        }
    
                        if(res.length){
                            console.log("valid token found: ", res[0].token);
                            result(null,res[0]);
                        } else {
                            let token = crypto.createHash('sha256').update(userId + new Date().toString()).digest('base64');
                            sql.query(`INSERT INTO User_login
                                        (user_id, token, valid_untill)
                                        VALUES (${userId}, '${token}', DATE_ADD(NOW(), INTERVAL 1 DAY))`, (err_1, res_1) =>{
                                            if(err_1){
                                                console.log("error creating a new token: ", err);
                                                result(err_1, null);
                                                return;
                                            }
                                            console.log("Token created with success for user :", userId );

                                            sql.query(`SELECT * FROM User_Login WHERE User_login.id = ${res_1.insertId}`, (err_2, res_2) =>{
                                                if(err_2){
                                                    console.log("error retrieving created token for userId: ", userId);
                                                    result(err_2, null);
                                                    return;
                                                }
                                                result(null,res_2[0]);
                                            })
                                        })
                        }
                    });
    }

}

module.exports = Login;