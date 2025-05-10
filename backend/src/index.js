import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
// import executionRoute from "./routes/executeCode.routes.js";
// import submissionRoutes from "./routes/submission.routes.js";


dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/" , (req , res)=>{
    res.send("Hello Guys welcome to SkillForge🔥");
})


app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/problems" , problemRoutes)
app.use("/api/v1/execute-code" , executionRoute)
app.use("/api/v1/submission" , submissionRoutes)
const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
