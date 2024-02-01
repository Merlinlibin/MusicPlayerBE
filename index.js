const config = require("./utils/config");
const app = require("./server");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

console.log("Connecting to mongoDB....");
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to mongoDB....");
    app.listen(config.PORT, () => {
      console.log(`Server running on  http://localhost:${config.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to DB : ", err.message);
  });
