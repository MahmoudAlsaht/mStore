import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import db from "@/db/db";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const categories = [
  "wearables",
  "pcs",
  "laptops",
  "game-consoles",
  "cast-devices",
  "monitors-and-tvs",
  "accessories",
  "smart-phones",
  "tablets",
];
const brands = [
  "apple",
  "samsung",
  "huawei",
  "oppo",
  "xiaomi",
  "lG",
  "sony",
  "microsoft",
  "google",
  "lenovo",
  "HP",
  "dell",
  "asus",
  "acer",
  "toshiba",
  "razer",
  "logitech",
  "bose",
  "JBL",
  "beats",
];

const brandsPath = "./Brands";
const categoriesPath = "./categories";

async function uploadImage(imagePath: string) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: process.env.CLOUDINARY_FOLDER_NAME,
      use_filename: true,
      unique_filename: false,
    });
    return {
      path: result?.secure_url,
      filename: result?.public_id,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

async function getImageForBrand(brand: string) {
  const files = fs.readdirSync(brandsPath);
  const brandFile = files.find((file) =>
    file.toLowerCase().includes(brand.toLowerCase()),
  );
  if (brandFile) {
    return await uploadImage(path.join(brandsPath, brandFile));
  }
  return null;
}

async function getImageForCategory(category: string) {
  const files = fs.readdirSync(categoriesPath);
  const categoryFile = files.find((file) =>
    file.toLowerCase().includes(category.toLowerCase()),
  );
  if (categoryFile) {
    return await uploadImage(path.join(categoriesPath, categoryFile));
  }
  return null;
}

function generateRandomProduct(index: number) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const name = `${brand} ${category.charAt(0).toUpperCase() + category.slice(1)} ${index + 1}`;
  const body = `${brand} ${category.charAt(0).toUpperCase() + category.slice(1)} Model ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 1000)}`;
  const price = Math.floor(Math.random() * 1500) + 50;
  const quantity = Math.floor(Math.random() * 101);
  const description = `High-quality ${category} device from ${brand}, perfect for ${["home", "office", "travel", "entertainment"][Math.floor(Math.random() * 4)]} use.`;

  return {
    name,
    body,
    price,
    quantity,
    description,
    brand,
    category,
  };
}

function generateProductOptions(productId: string) {
  const optionsCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 options
  const options: { name: string; price: number; productId: string }[] = [];

  for (let i = 0; i < optionsCount; i++) {
    options.push({
      name: `Option ${i + 1}`,
      price: Math.floor(Math.random() * 100) + 10,
      productId,
    });
  }

  return options;
}

async function createProducts(count: number) {
  for (let i = 0; i < count; i++) {
    const product = generateRandomProduct(i);

    // Find or create category
    let category = await db.section.findFirst({
      where: { name: product.category, type: "category" },
    });
    if (!category) {
      const categoryImage = await getImageForCategory(product.category);
      category = await db.section.create({
        data: {
          name: product.category,
          type: "category",
          cover: categoryImage
            ? {
                create: {
                  filename: categoryImage.filename,
                  path: categoryImage.path,
                  imageType: "CategoryCover",
                },
              }
            : undefined,
        },
      });
    }

    // Find or create brand
    let brand = await db.section.findFirst({
      where: { name: product.brand, type: "brand" },
    });
    if (!brand) {
      const brandImage = await getImageForBrand(product.brand);
      brand = await db.section.create({
        data: {
          name: product.brand,
          type: "brand",
          cover: brandImage
            ? {
                create: {
                  filename: brandImage.filename,
                  path: brandImage.path,
                  imageType: "BrandCover",
                },
              }
            : undefined,
        },
      });
    }

    // Use brand image for product
    const productImage = await getImageForBrand(product.brand);

    // Create the product
    if (!productImage) return;
    const newProductImage = await db.image.create({
      data: {
        filename: productImage.filename,
        path: productImage.path,
        imageType: "ProductImage",
      },
    });
    const newProduct = await db.product.create({
      data: {
        name: product.name,
        body: product.body,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        categoryId: category.id,
        brandId: brand.id,
        imageId: newProductImage.id,
      },
    });

    // Add options to some products (e.g., 30% chance)
    if (Math.random() < 0.3) {
      const options = generateProductOptions(newProduct.id);
      await db.productOptions.createMany({
        data: options,
      });
    }

    console.log(`Created product: ${newProduct.name}`);
  }
}

async function main() {
  try {
    await createProducts(500);
    console.log("Successfully created 500 products with images");
  } catch (error) {
    console.error("Error creating products:", error);
  } finally {
    await db.$disconnect();
  }
}

main();
