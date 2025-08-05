import { SignJWT, jwtVerify } from "jose";

export async function CreateToken(email) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const payload = {
    email: email,
    role: 'superadmin'
    // id: id,
  };
  let token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("Zahid")
    .setExpirationTime('1d')
    .sign(secret);
  return token;
}

export async function VerifyToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const decoded = await jwtVerify(token, secret);
  return decoded["payload"];
}