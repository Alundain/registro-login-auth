const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.post("/api/register", UserController.Register);
    app.post("/api/login", UserController.Login);
    //esta ruta debe ser autenticada
    app.get("/api/users", authenticate, UserController.getAll);
}