require("dotenv").config();
const express = require("express");

const app = express();
const PORT = 3000;
const mongoose = require("mongoose");

const adminRouter = require("./routes/admin");
app.use(express.json());

main()
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  mongoose.connect(process.env.MONGO_URL);
}

app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`ApnaCourse Server is listening to the port ${PORT}`);
});
