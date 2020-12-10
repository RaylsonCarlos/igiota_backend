const sql = require("./db.js");
const auth = require("./utils.js");

const Payment = function(payment){
    this.debt_id = payment.debt_id;
    this.value = payment.value;
}

Payment.create = (newPayment, userId, token, result) => {

    auth(userId, token, (err, res) =>{
        if(err){
            result(err, null);
            return;
        }

        if(res){
            sql.query(`INSERT INTO Payment SET ?`, newPayment, (err, res) => {
                if(err){
                    result(err, null);
                    return;
                }

                result(null, {id: res.insertId, ...newPayment});
            })

        } else {
            result({kind: "not_found"}, null);
        }
    })

};

Payment.findAll = (debtId , result) => {
    sql.query(`SELECT * FROM Payment WHERE debt_id = ${debtId}`, (err, res) => {
        if(err){
            result(err, null);
            return;
        }

        result(null, res);
    })
}

module.exports = Payment;