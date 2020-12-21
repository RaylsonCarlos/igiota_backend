const sql = require("./db.js");
const auth = require("./utils.js");

const Debt = function(debt){
    this.owner = debt.owner;
    this.owe_to = debt.owe_to;
    this.value = debt.value;
    this.active = debt.active;
};

Debt.create = (newDebt, token, result) => {

    auth(newDebt.owner, token, (err, res) => {
        if(err){
            result(err, null);
            return;
        }

        if(res){
            sql.query(`INSERT INTO Debt SET ?`, newDebt, (err, res) => {
                if(err){
                    result(err, null);
                    return;
                }
        
                result(null, {id: res.insertId, ...newDebt});
            });
        } else {
            result({kind : "not_found"}, null);
        }

    });
};

Debt.findAll = (userId, result) => {
    sql.query(`SELECT Debt.* , OWNER.name AS OWNER_NAME, OWNER.email AS OWNER_EMAIL, OWE_TO.name AS OWE_TO_NAME, OWE_TO.email AS OWE_TO_EMAIL
                    FROM Debt 
                        INNER JOIN User AS OWNER ON Debt.owner = OWNER.id
                        INNER JOIN User AS OWE_TO ON Debt.owe_to = OWE_TO.id
                    WHERE owner = ${userId} or owe_to = ${userId}`, (err, res) => {
        if(err){
            result(err, null);
            return;
        }

        result(null, res);
    })
};

module.exports = Debt;