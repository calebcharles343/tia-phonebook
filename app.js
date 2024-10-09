const express = require("express");
const Entry = require("./models/phonebookModel");
// const morgan = require("morgan");

const app = express();
app.use(express.json()); // To parse JSON request bodies

// entries
app.get("/api/v1/entries", (req, res) => {
  Entry.find({})
    .then((entries) => {
      res.json(entries);
    })
    .catch((error) =>
      res.status(500).json({ error: "unable to fetch entries" })
    );
});

// new entry
app.post("/api/v1/entries", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name || number is missing" });
  }

  const entry = new Entry({
    name: body.name,
    number: body.number,
  });

  entry
    .save()
    .then((savedEntry) => {
      res.json(savedEntry);
    })
    .catch((error) => res.status(500).json({ error: "unable to save entry" }));
});

// delete entry
app.delete("/api/v1/entries/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  Entry.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Entry not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Unable to delete entry" });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
