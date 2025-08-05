import dbConnect from "@/lib/dbConnect";
import Wishlist from "@/models/wishlistModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const wishlist = await Wishlist.findOne({ user: userId }).populate("products");

    if (!wishlist) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    return NextResponse.json(wishlist, { status: 200 });
  } catch (error) {
    console.error("GET wishlist Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// POST

export async function POST(req) {
  try {
    await dbConnect();
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { success: false, message: "userId and productId are required" },
        { status: 400 }
      );
    }

    // Add product to wishlist (no duplicates)
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $addToSet: { products: productId } },
      { upsert: true, new: true }
    ).populate("products");

    return NextResponse.json(
      { success: true, message: "Product added to wishlist", wishlist },
      { status: 200 }
    );
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// DELETE Method
export async function DELETE(request) {
  try {
    await dbConnect();
    const { userId, productId } = await request.json();

    if (!userId || !productId) {
      return NextResponse.json({ message: "userId and productId are required" }, { status: 400 });
    }

    // Remove product from wishlist
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { products: productId } },
      { new: true }
    ).populate("products");

    if (!wishlist) {
      return NextResponse.json({ message: "Wishlist not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "Product removed from wishlist", wishlist },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Wishlist Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
