module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const login = require("../controllers/login.controller.js");
    const debts = require("../controllers/debt.controller.js");
    const payments = require("../controllers/payment.controller.js");

    // Login
    app.post("/login", login.check);

    // Create debt
    app.post("/debts", debts.create);

    // Find debts by user
    app.get("/debts/:userId", debts.findAll);

    // Create a payment
    app.post("/payments", payments.create);

    // Find payments by debt
    app.get("/payments/:debtId", payments.findAll);
  
    // Create a new Customer
    app.post("/users", users.create);
  
    // Retrieve all Customers
    app.get("/users", users.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/users/:userId", users.findOne);
  
    // Update a Customer with customerId
    app.put("/users/:userId", users.update);
  
    // Delete a Customer with customerId
    app.delete("/users/:userId", users.delete);
  
    // Delete all users
    app.delete("/users", users.deleteAll);
  };