require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.static(".")); // Serves your HTML files

// Proxy endpoint
app.get("/api/certificate-verify", async (req, res) => {
  try {
    const { certificate_number } = req.query;

    const response = await axios.get(
      "https://api.qualhub.org/api/v2/trainee/certificate/verify",
      {
        params: { certificate_number },
        headers: {
          Authorization:
            "Basic " + btoa(process.env.username + ":" + process.env.password),
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: "Certificate verification failed",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
