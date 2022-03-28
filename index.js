//https://blog.logrocket.com/build-rest-api-node-express-mysql/
const express = require("express");

//wire up cors
var cors = require('cors')

const app = express();
app.use(cors())
const port = 4050;

//make reference to your router
const router = require("./routes/routeProgLanguage");


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//this is your default route /
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

//with your router helper, create a /programming-languages  (route)
// http://localhost:4050/programming-languages
app.use("/programming-languages", router);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

//create the port listener
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});