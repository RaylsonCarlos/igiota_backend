const sql = require("./db.js");

const Debt = function(debt){
    this.owner = debt.owner;
    this.owe_to = debt.owe_to;
    this.value = debt.value;
    this.active = debt.active;
};

Debt.create = (newDebt, result) => {
    sql.query(`INSERT INTO Debt SET ?`, newDebt, (err, res) => {
        if(err){
            result(err, null);
            return;
        }

        result(null, {id: res.insertId, ...newDebt});
    });
};

Debt.findAll = (userId, result) => {
    sql.query(`SELECT * FROM Debt WHERE owner = ${userId} or owe_to = ${userId}`, (err, res) => {
        if(err){
            result(err, null);
            return;
        }

        result(null, res);
    })
};

module.exports = Debt;