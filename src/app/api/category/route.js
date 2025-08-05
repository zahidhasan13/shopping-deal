import { NextResponse } from "next/server";
import Category from "@/models/categoryModel";
import dbConnect from "@/lib/dbConnect";
import cloudinary from "@/lib/cloudinary";

export const GET = async (request) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      // Fetch single category with populated products
      const category = await Category.findOne({ slug })
        .populate({
          path: "products",
          options: { 
            sort: { createdAt: -1 },
            // Limit fields for better performance
            select: "title slug price images category"
          }
        });

      if (!category) {
        return NextResponse.json(
          { error: "Category not found", success: false },
          { status: 404 }
        );
      }

      return NextResponse.json({ 
        success: true,
        category 
      }, { status: 200 });
    }

    // Fetch all categories without products for better performance
    const categories = await Category.find()
      .select("-__v") // Exclude version key
      .lean();

    return NextResponse.json({ 
      success: true,
      categories 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch categories",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
};

// POST category with optional file (image) upload
export const POST = async (request) => {
  try {
    await dbConnect();
    const formData = await request.formData();

    const name = formData.get("name")?.trim();
    const slug = formData.get("slug")?.trim();
    const file = formData.get("image");

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: "Name and slug are required" },
        { status: 400 }
      );
    }

    // Check for existing category
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: "Category already exists" },
        { status: 409 }
      );
    }

    // Handle image upload if provided
    let imageUrl = null;
    let publicId = null;

    if (file) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "categories",
                resource_type: "auto",
              },
              (error, result) => {
                if (error) reject(error);
                resolve(result);
              }
            )
            .end(buffer);
        });

        imageUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
      } catch (uploadError) {
        return NextResponse.json(
          { success: false, error: "File upload failed" },
          { status: 500 }
        );
      }
    }

    // Create category (image is optional)
    const newCategory = await Category.create({
      name,
      slug,
      ...(imageUrl && { image: imageUrl }),
      ...(publicId && { public_id: publicId }),
    });

    return NextResponse.json(
      { success: true, data: newCategory },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal server error",
        ...(process.env.NODE_ENV === 'development' && { details: error.message })
      },
      { status: 500 }
    );
  }
};

// Delete Method
export const DELETE = async (request) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return NextResponse.json(
        { error: "Category not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to delete category" },
      { status: 500 }
    );
  }
};
