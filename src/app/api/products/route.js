import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/categoryModel";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";


export const GET = async (request) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const product = await Product.findOne({ slug })
        .populate("category") // Populate category info
        .lean();

      if (!product) {
        return NextResponse.json(
          { error: "Product not found", success: false },
          { status: 404 }
        );
      }

      return NextResponse.json({ product }, { status: 200 });
    }

    const products = await Product.find()
      .populate("category") // Populate all products' categories
      .lean();

    return NextResponse.json({ products }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};



// POST method

export const POST = async (request) => {
  try {
    await dbConnect();

    const formData = await request.formData();

    const title = formData.get("title");
    const slug = formData.get("slug");
    const description = formData.get("description");
    const price = formData.get("price");
    const oldPrice = formData.get("oldPrice");
    const categoryId = formData.get("category");
    const sold = formData.get("sold") || 0;
    const review = formData.get("review") || null;

    const files = formData.getAll("images"); // handles multiple files named "images"

    if (!title || !slug || !description || !price || !oldPrice || !categoryId || files.length === 0) {
      return NextResponse.json(
        { error: "All fields are required including at least one image." },
        { status: 400 }
      );
    }

    // Check if slug is already used in products
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return NextResponse.json(
        { error: "Product slug already exists" },
        { status: 409 }
      );
    }

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    const uploadedImageUrls = [];

    for (const file of files) {
      if (typeof file === "object") {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: "products",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          ).end(buffer);
        });

        uploadedImageUrls.push(uploadResult.secure_url);
      }
    }

    const newProduct = new Product({
      title,
      slug,
      description,
      price,
      oldPrice,
      category: categoryId,
      sold,
      images: uploadedImageUrls,
      review
    });

    await newProduct.save();

    return NextResponse.json(newProduct, {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

// Delete Product
export const DELETE = async (request) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log(id);

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
};
