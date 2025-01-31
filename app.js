import express from "express";

import geminiRouter from ".//routes/gemini.js"; 



const app = express();
const port = 3000;


app.use(express.json());


app.use("/api/gemini", geminiRouter);


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});