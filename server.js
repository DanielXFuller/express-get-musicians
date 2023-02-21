const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//TODO

app.get('/musicians', async (req, res) => {
  try {
    const musicians = await Musician.findAll();
    res.json(musicians);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/musicians/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const musician = await Musician.findByPk(id);
    if (musician) {
      res.json(musician);
    } else {
      res.status(404).send('Musician not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})