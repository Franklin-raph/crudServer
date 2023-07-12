const CrudModel = require("../model/crudModel");

const getAllCruds = async (req, res) => {
  try {
    const allCrud = await CrudModel.find().sort({ createdAt: -1 });
    return res.status(200).json(allCrud);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal Server Error" });
  }
};

const postCrud = async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!title || !description) {
      return res.status(400).json({ err: "Please fill in all fields" });
    }

    // to create an instance of the ,model
    // const crud = new CrudModel({ title, description });
    // await crud.save()

    const crud = await CrudModel.create({ title, description });
    console.log(crud);
    return res.status(201).json(crud);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal Server Error" });
  }
};

const getACrud = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  // Also the same as the line 35, the different is line 88 is only getting a single id, while line 35 we can get different parameters
  // const id = req.params.id
  try {
    const crud = await CrudModel.findById(id);
    if (!crud) {
      return res.status(404).json({ msg: "Data not found" });
    }
    return res.status(200).json(crud);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal Server Error" });
  }
};
const patchCrud = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  console.log(id);
  try {
    const crudUpdate = await CrudModel.findByIdAndUpdate(
      id,

      // {title, description}
      { ...req.body }, //using rest operator instead og line 55
      { new: true }
    );
    if (!crudUpdate) {
      return res.status(404).json({ msg: "Data not found" });
    }
    return res.status(200).json(crudUpdate);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal Server Error" });
  }
};

const deleteCrud = async (req, res) => {
  const { id } = req.params;
  
  try {
   const crudDelete = await CrudModel.findById(id);
    if (!crudDelete) {
      return res.status(404).json({ msg: "Data not found" });
    }
    await CrudModel.deleteOne(crudDelete)
    return res.status(200).json({ msg: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal Server Error" });
  }
};

module.exports = { getAllCruds, postCrud, getACrud, patchCrud, deleteCrud };
