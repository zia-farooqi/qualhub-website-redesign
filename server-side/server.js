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
            "Basic " +
            Buffer.from(
              `${process.env.candidateName}:${process.env.candidatepassword}`
            ).toString("base64"),
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Full API Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message:
        error.response?.data?.message || error.response?.data || error.message,
      status: error.response?.status,
    });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
