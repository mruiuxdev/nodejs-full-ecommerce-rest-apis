const asyncHandler = require("express-async-handler");
const APIError = require("../utils/apiError");
const APIFeatures = require("../utils/apiFeature");

const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);

    if (!doc) {
      return next(new APIError("No document found", 404));
    }

    res.status(204).send();
  });

const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!doc) {
      return next(new APIError("doc not found", 404));
    } else {
      res.status(200).json({ data: doc });
    }
  });

const createOne = (Model) =>
  asyncHandler(async (req, res, _next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({ data: doc });
  });

const getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new APIError("doc not found", 404));
    } else {
      res.status(200).json({ data: doc });
    }
  });

const getAll = (Model, searchModelName) =>
  asyncHandler(async (req, res, _next) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }

    const countDocs = await Model.countDocuments();

    const apiFeatures = await new APIFeatures(Model.find(filter), req.query)
      .paginate(countDocs)
      .filter()
      .sort()
      .search(searchModelName)
      .limitFields();

    const { mongooseQuery, paginationResult } = apiFeatures;
    const docs = await mongooseQuery;

    res
      .status(200)
      .json({ results: docs.length, paginationResult, data: docs });
  });

module.exports = { deleteOne, updateOne, createOne, getOne, getAll };
