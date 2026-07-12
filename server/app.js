require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB=require("./config/db");
const authRoutes = require("./routes/authRoutes");

require("./models/User");

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Server Running");
});
app.post("/test", (req, res) => {
    console.log("Test route hit");
    console.log(req.body);

    res.json({
        success: true,
        message: "Test route working"
    });
});
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

