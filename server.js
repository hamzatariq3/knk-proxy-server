import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // for form-data
app.use(bodyParser.json()); // still allow JSON

app.post("/proxy/order/import", async (req, res) => {
  try {
    // Convert incoming body into form-data string
    const formBody = new URLSearchParams(req.body);

    const response = await fetch("https://api.konnektive.com/order/import/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody.toString(),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Proxy running on port 3000"));
