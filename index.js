const express = require("express");
const { translate } = require("@vitalets/google-translate-api");

const app = express();
const port = 8000;

app.use(express.json());

app.post("/translate", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res
      .status(400)
      .json({ error: 'Missing "text" field in request body' });
  }

  try {
    const translation = await translate(text, { to: "fr" });
    res.status(200).json({ translation: translation.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
