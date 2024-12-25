import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import userRouter from "./route/userRoutes.js";
dotenv.config({ path: `${process.cwd()}/.env` });
import { errorHandling } from "./middlewares/errorHandler.js";
import { createUserTable } from "./data/createUserTable.js";

const app = express();
app.use(express.json())
app.use(cors())
const PORT = process.env.APP_PORT || 3001;

//route to check DB Connection
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()")
    res.send(`The database name is : ${result.rows[0].current_database}`)
})

//all routes will be here
app.use("/api", userRouter)

//error handling
app.use(errorHandling)

//Create table before starting server
createUserTable();

//invalid route
app.use("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: "Route not found"
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);

})
