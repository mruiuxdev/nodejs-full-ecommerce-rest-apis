const categoryModel = require("../models/category.model");

const createCategory = async (req, res) => {
  const { name } = req.body;
  console.log(name);

  const newCategory = new categoryModel({ name });
  newCategory
    .save()
    .then((doc) => res.json(doc))
    .catch((err) => console.error(err));
};

module.exports = { createCategory };
