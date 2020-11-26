const Login = require("../models/login.model.js");

exports.check = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const login = new Login({
        email: req.body.email,
        password: req.body.password
    });

    Login.check(login, (error, data) =>{
        if(error){
            res.status(500).send({
                message: error.message || "Some error occurred while trying to login."
            });
        } else {
            res.send(data);
        }
    });


}