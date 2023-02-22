const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//TODO

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.post('/musicians', async (req, res) => {
  try {
    const musician = await Musician.create(req.body);
    res.json(musician);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/musicians/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [rowsUpdated, [updatedMusician]] = await Musician.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rowsUpdated === 1) {
      res.json(updatedMusician);
    } else {
      res.status(404).send('Musician not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/musicians/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const rowsDeleted = await Musician.destroy({ where: { id } });
    if (rowsDeleted === 1) {
      res.sendStatus(204);
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