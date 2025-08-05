import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const GET = async (request) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    
    if (email) {
      const user = await User.findOne({ email }).select("-password");
      if (!user) {
        return NextResponse.json(
          { error: "User not found", success: false },
          { status: 404 }
        );
      }
      return NextResponse.json({ user }, { status: 200 });
    }

    const users = await User.find({}).select("-password").lean();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
};

// Create User
export const POST = async (request) => {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, email, password, addresses = [] } = body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    // Ensure at least one primary address if addresses are provided
    if (addresses.length > 0) {
      const hasPrimary = addresses.some(addr => addr.isPrimary);
      if (!hasPrimary) {
        addresses[0].isPrimary = true;
      }
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      addresses
    });

    await newUser.save();
    
    // Return user without password
    const userObj = newUser.toObject();
    delete userObj.password;

    return NextResponse.json(
      { message: "User created successfully", user: userObj },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create user" },
      { status: 500 }
    );
  }
};

// Update User
export const PATCH = async (request) => {
  try {
    await dbConnect();
    const body = await request.json();
    const { id, name, email, password, addresses } = body;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { error: "User not found", success: false },
        { status: 404 }
      );
    }

    // Email update check
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email already in use");
      }
      user.email = email;
    }

    // Update fields
    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10);
    
    // Handle addresses update
    if (addresses) {
      // Ensure only one primary address exists
      const primaryCount = addresses.filter(addr => addr.isPrimary).length;
      if (primaryCount > 1) {
        throw new Error("Only one address can be primary");
      }
      
      // If no primary and addresses exist, make first one primary
      if (addresses.length > 0 && !addresses.some(addr => addr.isPrimary)) {
        addresses[0].isPrimary = true;
      }
      
      user.addresses = addresses;
    }

    await user.save();
    
    // Return updated user without password
    const userObj = user.toObject();
    delete userObj.password;

    return NextResponse.json(
      { message: "User updated successfully", user: userObj },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update user" },
      { status: 500 }
    );
  }
};

// Delete User
export const DELETE = async (request) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json(
        { error: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to delete user" },
      { status: 500 }
    );
  }
};