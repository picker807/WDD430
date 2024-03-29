const sequenceGenerator = require('./sequence');
const Location = require('../models/location');
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  Location.find({}).populate('inventory').exec()
    .then(locations => {
      res.status(200).json(locations);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', async (req, res, next) => {
  try{
  const maxLocationId = await sequenceGenerator.nextId("stores");

  const location = new Location({
    id: maxLocationId,
    storeName: req.body.storeName,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    inventory: req.body.inventory
  });

    const createdLocation = await location.save();
    res.status(201).json({
      message: 'Location added successfully',
      location: createdLocation
      });
  } catch(error) {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    }
});

router.put('/:id', (req, res, next) => {
  Location.findOne({ id: req.params.id })
    .then(location => {
      if (!location) {
        return res.status(404).json({
          message: 'Location not found'
        });
      }

      location.id = req.body.id;
      location.storeName = req.body.storeName;
      location.address = req.body.address;
      location.city = req.body.city;
      location.state = req.body.state;
      location.zipCode = req.body.zipCode;
      location.inventory = req.body.inventory;

      return location.save();
    })
    .then(result => {
      res.status(204).json({
        message: 'Location updated successfully'
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Location not found.',
        error: { location: 'Location not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Location.findOne({ id: req.params.id })
    .then(location => {
      Location.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Location deleted successfully"
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
        message: 'Location not found.',
        error: { location: 'Location not found'}
      });
    });
});

module.exports = router;