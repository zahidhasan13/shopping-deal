import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cartModel";
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("GET Cart Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { userId, productId, quantity } = body;

    if (!userId || !productId) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: quantity || 1 }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity || 1;
      } else {
        cart.items.push({ product: productId, quantity: quantity || 1 });
      }

      await cart.save();
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("POST Cart Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PATCH


// DELETE
export async function DELETE(request) {
  try {
    await dbConnect();
    const { userId, productId } = await request.json();

    if (!userId || !productId) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("DELETE Cart Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


