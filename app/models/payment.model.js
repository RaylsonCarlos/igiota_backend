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
    sql.query(`SELECT *, OWNER.id AS DEBT_OWNER_ID, OWNER.name AS DEBT_OWNER_NAME, OWNER.email AS DEBT_OWNER_EMAIL,
                    OWE_TO.id AS DEBT_OWE_TO_ID, OWE_TO.name AS DEBT_OWE_TO_NAME, OWE_TO.email AS DEBT_OWE_TO_EMAIL                    
                    FROM Payment 
                        INNER JOIN Debt ON Payment.debt_id = Debt.Id
                        INNER JOIN User AS OWNER ON Debt.Owner = OWNER.id
                        INNER JOIN User AS OWE_TO ON Debt.Owe_to = OWE_TO.id
                            WHERE debt_id = ${debtId}`, (err, res) => {
        if(err){
            result(err, null);
            return;
        }

        result(null, res);
    })
}

module.exports = Payment;