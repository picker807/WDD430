const sequenceGenerator = require('./sequence');
const Guitar = require('../models/guitar');
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  Guitar.find({}).exec()
    .then(guitars => {
      res.status(200).json(guitars);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', async (req, res, next) => {
  try{
  const maxGuitarId = await sequenceGenerator.nextId("guitars");

  const guitar = new Guitar({
    id: maxGuitarId,
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    condition: req.body.condition,
    image: req.body.image
  });

    const createdGuitar = await guitar.save();
    res.status(201).json({
      message: 'Guitar added successfully',
      guitar: createdGuitar
      });
  } catch(error) {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    }
});

router.put('/:id', (req, res, next) => {
  Guitar.findOne({ id: req.params.id })
    .then(guitar => {
      if (!guitar) {
        return res.status(404).json({
          message: 'Item not found'
        });
      }

      guitar.brand = req.body.brand;
      guitar.model = req.body.model;
      guitar.year = req.body.year;
      guitar.price = req.body.price;
      guitar.description = req.body.description;
      guitar.category = req.body.category;
      guitar.condition = req.body.condition;
      guitar.image = req.body.image

      return guitar.save();
    })
    .then(result => {
      res.status(204).json({
        message: 'Guitar updated successfully'
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Guitar not found.',
        error: { guitar: 'Guitar not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Guitar.findOne({ id: req.params.id })
    .then(contact => {
      Guitar.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Guitar deleted successfully"
          });
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Guitar not found.',
        error: { guitar: 'Guitar not found'}
      });
    });
});

module.exports = router;