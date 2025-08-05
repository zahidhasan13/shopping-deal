import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/adminModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CreateToken } from "@/lib/tokenHelper";

// ================== GET all admins ==================
export async function GET() {
  try {
    await dbConnect();

    const admins = await Admin.find().select("-password"); // hide password
    return NextResponse.json({ success: true, data: admins }, { status: 200 });
  } catch (error) {
    console.error("GET Admin Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// ================== POST (Admin Login) ==================


export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 });
  }

  const isEmailValid = email === process.env.ADMIN_EMAIL;
  const isPasswordValid = password === process.env.ADMIN_PASSWORD;

  if (!isEmailValid || !isPasswordValid) {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  }

  const token = await CreateToken(email)

  const res = NextResponse.json({ success: true, message: "Login successful" }, { status: 200 });

  res.cookies.set({
    name: "admin-token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/"
  });

  return res;
}














// export const POST = async (req) => {
//   try {
//     await dbConnect();
//     const { name, email, password, role } = await req.json();

//     if (!name || !email || !password) {
//       throw new Error("Name, Email, Password are required!");
//     }
//     const hashPassword = await bcrypt.hash(password,10);
//     const admin = await Admin.create({
//       name,
//       email,
//       password:hashPassword,
//       role: role || "admin",
//     });
//     return NextResponse.json({admin},{status:201})
//   } catch (error) {
//     return NextResponse.json({error:error.message},{status:201})
//   }
// };


// export const POST = async (req) => {
//   try {
//     await dbConnect();
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       throw new Error("Email and Password are required!");
//     }

//     const admin = await Admin.findOne({ email }).select("+password");
//     if (!admin) {
//       throw new Error("Admin not found");
//     }

//     // Compare hashed password
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       throw new Error("Password Incorrect");
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: admin._id, role: admin.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     return NextResponse.json(
//       { message: "Login Successful", token },
//       { status: 200 }
//     );

//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 200 });
//   }
// };


