const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryDataById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryDataById) {
      res.status(404).json({ message: "No Category found with that id!" });
      return;
    }

    res.status(200).json(categoryDataById);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const postNewData = await Category.create(req.body);
    postNewData;
    res.status(200).json({ message: "Category successfully added" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
  const selectedId = req.params.id;
  const updatedName = req.body.category_name;
  const updateById = await Category.update(
    { category_name: updatedName },
    { where: { id: selectedId}}
  );

  updateById
  res.status(200).json({ message: "Category successfully updated" });
  } 
  catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const selectedId = req.params.id;
    const deleteById = await Category.destroy({
      where: {
        id: selectedId,
      },
    });

    deleteById;
    res.status(200).json({ message: "Category successfully deleted" });

  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
