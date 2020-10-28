const express = require('express');
const cors = require('cors');
const app = express();
const connectMongoDB = require('./db');
const apiRouter = require('./api/index');

const isDevelopment = process.env.NODE_ENV === "development";

if (isDevelopment) {
	app.use(cors());
} else {
	app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
}
// Connect To MongoDB
connectMongoDB();

app.use(express.json({ extended: true }));

//Define Routes
app.use('/api/', apiRouter);

// serve static assets and production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  
    app.use("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

const port = process.env.PORT || 5000;
  
app.listen(port, () => console.log(`Server up and running on port ${port}`));