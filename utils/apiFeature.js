class APIFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  paginate(countDocs) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 50;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    //* Pagination result
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countDocs / limit);

    //* Next page
    if (endIndex < countDocs) {
      pagination.next = page + 1;
    }

    //* Prev page
    if (skip > 0) {
      pagination.prev = page - 1;
    }

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;

    return this;
  }

  filter() {
    //* Exclude filter queries
    const queryStringObj = { ...this.queryString };
    const excludesFields = ["page", "sort", "limit", "fields", "search"]; // These fields are API control parameters, not MongoDB filters

    excludesFields.forEach((field) => delete queryStringObj[field]);

    //* {price: {$gte: 50}, ratingsAverage: {$gte: 4}} => Mongoose query
    //* {price: {gte: '50'}, ratingsAverage: {gte: '4'}} => Req query "{{dev__localhost}}/products?price[gte]=50&ratingsAverage[gte]=4"
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");

      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");

      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }

    return this;
  }

  search(modelName) {
    if (this.queryString.search) {
      let query = {};

      if (modelName === "Products") {
        query.$or = [
          { name: { $regex: this.queryString.search, $options: "i" } },
          { description: { $regex: this.queryString.search, $options: "i" } }
        ];
      } else {
        query = { name: { $regex: this.queryString.search, $options: "i" } };
      }

      this.mongooseQuery = this.mongooseQuery.find(query);
    }

    return this;
  }
}

module.exports = APIFeatures;
