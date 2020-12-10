const Debt = require("../models/debt.model.js")

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }    

    const debt = new Debt({
        owner: req.body.owner,
        owe_to: req.body.owe_to,
        value: req.body.value,
        active: req.body.active,        
    })

    Debt.create(debt, req.body.token, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({message: "unauthorized!"});
                return;
            }
            res.status(500).send({
                message: err.message || "Some error occured while creating the Debt."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Debt.findAll(req.params.userId, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving debts."
            });
        } else res.send(data);
    })
}