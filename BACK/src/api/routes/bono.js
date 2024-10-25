const { isAuth, isAdmin } = require("../../middlewares/auth");
const { newBono, deleteBono, getBonos, updateBono } = require("../controllers/bono");
const bonoRoutes = require("express").Router();

bonoRoutes.post("/new-bono", newBono);
bonoRoutes.delete("/:id", [isAdmin], deleteBono);
bonoRoutes.put("/:id", [isAuth], updateBono);
bonoRoutes.get("/bono-list", getBonos);

module.exports = bonoRoutes;