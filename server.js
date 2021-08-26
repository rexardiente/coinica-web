const express = require("express");
const path = require("path");
const cors = require("cors");
const expressStaticGzip = require("express-static-gzip");

const port = process.env.PORT || 5000;

// Path to build directory
const clientDirPath = path.resolve(__dirname, "build");

// Path to index.html file
const clientIndexHtml = path.join(clientDirPath, "index.html");

// Init express
const app = express();
const router = express.Router();

// Enable cors
router.use(cors());

app.use(
  expressStaticGzip("build", {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
  })
);

// Set the static files root directory
// from which it should serve the files from.
console.log("clientDirPath", clientDirPath);
app.use(express.static(clientDirPath));

// Always send the index.html file to the client
app.get("*", (req, res) => {
  res.sendFile(clientIndexHtml);
});

console.log("Starting server");
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
