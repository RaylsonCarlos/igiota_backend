const Payment = require("../models/payment.model.js");

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const payment = new Payment({
        debt_id: req.body.debt,
        value: req.body.value
    })

    Payment.create(payment, req.body.user, req.body.token, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({
                    message: "unauthorized!"
                });
                return;
            }

            res.status(500).send({
                message: err.message || "Some error occurred while creating the Payment."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Payment.findAll(req.params.debtId, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving payments"
            });
        } else res.send(data);
    })
};