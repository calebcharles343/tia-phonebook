/*
(function (exports, require, module, __filename, __dirname) {
  code
});
*/
const mongoose = require("mongoose");

// command line arguments
const node_exe = process.argv[0];
const entry_point = process.argv[1];

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

// Check if the password is provided
if (!password) {
  console.log("give password as argument");
  process.exit(1); // exits with code 1 (error) and  0 (success)
}

// Connect to MongoDB using Mongoose
const url = `mongodb+srv://calebcharles343:${password}@cluster0.quzvfur.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url);

// Define the schema for phonebook entries
const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Create a model based on the schema
const Entry = mongoose.model("Entry", entrySchema);

// Function to add a new entry
const addEntry = (name, number) => {
  const entry = new Entry({ name, number });

  entry.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
};

// Function to list all entries
const listEntries = () => {
  console.log("phonebook:");
  Entry.find({}).then((entries) => {
    entries.forEach((entry) => {
      console.log(`${entry.name} ${entry.number}`);
    });
    mongoose.connection.close();
  });
};

// if name and number are provided add entries, otherwise list all entries
if (name && number) {
  addEntry(name, number);
} else {
  listEntries();
}
