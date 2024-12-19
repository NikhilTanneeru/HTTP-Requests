const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const uri = "mongodb://127.0.0.1:27017/Workshop";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const dataSchema = new mongoose.Schema({
  data: { type: String, required: true }
});
const Data = mongoose.model('Data', dataSchema,'Data');

app.use(bodyParser.json());

// GET Request: This will retrieve all data
app.get('/get', async (req, res) => {
  try {
    const data = await Data.find({});
    res.json(data);
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
});

// POST Request: This will create a new entry
app.post('/post', async (req, res) => {
  try {
    const newData = new Data({ data: req.body.data });
    await newData.save();
    res.send(`POST Request: Data inserted with ID ${newData._id}`);
  } catch (err) {
    res.status(500).send("Error inserting data");
  }
});

// PUT Request: This will update data by ID
app.put('/put', async (req, res) => {
  try {
    const { id, data } = req.body;
    const updatedData = await Data.findByIdAndUpdate(id, { data }, { new: true });
    if (updatedData) {
      res.send("PUT Request: Data updated successfully");
    } else {
      res.send("No document found to update");
    }
  } catch (err) {
    res.status(500).send("Error updating data");
  }
});

// DELETE Request: This will delete data by ID
app.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Data.findByIdAndDelete(id);
    if (result) {
      res.send("DELETE Request: Data deleted successfully");
    } else {
      res.send("No document found to delete");
    }
  } catch (err) {
    res.status(500).send("Error deleting data");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
