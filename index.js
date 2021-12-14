import  express from "express";
import cors from "cors";
import {serverRouter} from "./routes/index.js";

const app = express();
const PORT = 3000;

//MW
app.use(cors("*"));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routes
serverRouter(app)

app.listen(PORT, ()=>{
    console.log(`Conected to http://localhost:${PORT}`);
})