const router = require('express').Router();
const { Category, Product } = require('../../models');
const { restore } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({ include: Product });
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch(err) {
    restore.status(500).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }});

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
