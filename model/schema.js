const mongoose = require("mongoose");

const KeepSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date, 
    default: Date.now
}
});

const KeepEntries = mongoose.model("keepdata", KeepSchema);

module.exports = KeepEntries;
