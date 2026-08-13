const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const slugify = require("slugify");
require("colors");

const Brand = require("../../models/brand.model");
const Category = require("../../models/category.model");
const SubCategory = require("../../models/subCategory.model");
const Product = require("../../models/product.model");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const readJson = (fileName) => {
  const filePath = path.join(__dirname, fileName);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const insertData = async () => {
  const brandsData = readJson("brands.json");
  const categoriesData = readJson("categories.json");
  const subCategoriesData = readJson("subcategories.json");
  const productsData = readJson("products.json");

  const brandNames = new Set(brandsData.map(({ name }) => name));
  const categoryNames = new Set(categoriesData.map(({ name }) => name));
  const subCategoryParents = new Map(
    subCategoriesData.map(({ name, categoryName }) => [name, categoryName])
  );

  for (const { name, categoryName } of subCategoriesData) {
    if (!categoryNames.has(categoryName)) {
      throw new Error(
        `Unknown categoryName "${categoryName}" for subcategory "${name}"`
      );
    }
  }

  for (const product of productsData) {
    if (!categoryNames.has(product.categoryName)) {
      throw new Error(
        `Unknown categoryName "${product.categoryName}" for product "${product.name}"`
      );
    }
    if (product.brandName && !brandNames.has(product.brandName)) {
      throw new Error(
        `Unknown brandName "${product.brandName}" for product "${product.name}"`
      );
    }
    for (const subCategoryName of product.subCategoryNames || []) {
      const parentName = subCategoryParents.get(subCategoryName);
      if (!parentName) {
        throw new Error(
          `Unknown subcategory "${subCategoryName}" for product "${product.name}"`
        );
      }
      if (parentName !== product.categoryName) {
        throw new Error(
          `Subcategory "${subCategoryName}" does not belong to product category "${product.categoryName}"`
        );
      }
    }
  }

  const brands = await Brand.insertMany(
    brandsData.map((brand) => ({
      ...brand,
      slug: brand.slug || slugify(brand.name, { lower: true })
    }))
  );
  const brandIds = new Map(
    brands.map((brand) => [brand.name, brand._id])
  );

  const categories = await Category.insertMany(
    categoriesData.map((category) => ({
      ...category,
      slug: category.slug || slugify(category.name, { lower: true })
    }))
  );
  const categoryIds = new Map(
    categories.map((category) => [category.name, category._id])
  );

  const subCategories = await SubCategory.insertMany(
    subCategoriesData.map(({ categoryName, ...subCategory }) => {
      const category = categoryIds.get(categoryName);
      if (!category) {
        throw new Error(
          `Unknown categoryName "${categoryName}" for subcategory "${subCategory.name}"`
        );
      }

      return {
        ...subCategory,
        slug: subCategory.slug || slugify(subCategory.name, { lower: true }),
        category
      };
    })
  );
  const subCategoryIds = new Map(
    subCategories.map((subCategory) => [subCategory.name, subCategory._id])
  );

  const products = productsData.map(
    ({ categoryName, subCategoryNames = [], brandName, ...product }) => {
      const category = categoryIds.get(categoryName);
      if (!category) {
        throw new Error(
          `Unknown categoryName "${categoryName}" for product "${product.name}"`
        );
      }

      const subCategoriesForProduct = subCategoryNames.map((name) => {
        const subCategory = subCategoryIds.get(name);
        if (!subCategory) {
          throw new Error(
            `Unknown subcategory "${name}" for product "${product.name}"`
          );
        }
        return subCategory;
      });
      const brand = brandName ? brandIds.get(brandName) : undefined;
      if (brandName && !brand) {
        throw new Error(
          `Unknown brandName "${brandName}" for product "${product.name}"`
        );
      }

      return {
        ...product,
        slug: product.slug || slugify(product.name, { lower: true }),
        category,
        subCategories: subCategoriesForProduct,
        brand
      };
    }
  );

  await Product.insertMany(products);
  console.log(
    "Brands, categories, subcategories, and products inserted".green.inverse
  );
};

const destroyData = async () => {
  //* Delete children first so no documents keep references to deleted parents.
  await Product.deleteMany();
  await SubCategory.deleteMany();
  await Category.deleteMany();
  await Brand.deleteMany();
  console.log(
    "Brands, categories, subcategories, and products deleted".red.inverse
  );
};

const run = async () => {
  const command = process.argv[2];

  if (!["-i", "--import", "-d", "--delete"].includes(command)) {
    throw new Error(
      "Use -i/--import to seed data or -d/--delete to delete seeded collections"
    );
  }

  await mongoose.connect(process.env.DB_URI);

  if (["-i", "--import"].includes(command)) {
    await insertData();
  } else {
    await destroyData();
  }
};

run()
  .catch((error) => {
    console.error(`Seeder failed: ${error.message}`.red);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
