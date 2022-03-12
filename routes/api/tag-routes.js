const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const TagDataById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!TagDataById) {
      res.status(404).json({ message: "No Tag found with that id!" });
      return;
    }

    res.status(200).json(TagDataById);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const postNewData = await Tag.create(req.body);
    postNewData;
    res.status(200).json({ message: "Tag successfully added" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const selectedId = req.params.id;
    const updatedName = req.body.tag_name;
    const updateById = await Tag.update(
      { tag_name: updatedName },
      { where: { id: selectedId}}
    );
  
    updateById
    res.status(200).json({ message: "Tag successfully updated" });
    } 
    catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const selectedId = req.params.id;
    const deleteById = await Tag.destroy({
      where: {
        id: selectedId,
      },
    });

    deleteById;
    res.status(200).json({ message: "Tag successfully deleted" });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
