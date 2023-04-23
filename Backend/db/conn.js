const mongoose = require("mongoose");
const DB = process.env.DATABASE || 'mongodb+srv://omprarox:prakash@cluster0.wiy9wfg.mongodb.net/?retryWrites=true&w=majority';
mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log("error  in conncting:- ",err);
  });
