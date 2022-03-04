export async function encrypt(data) {
  const { createCipheriv } = await import("crypto");
  let cipher = createCipheriv("aes-256-ccm", process.env.SECRET);
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export async function decrypt(data) {
  const { createDecipheriv } = await import("crypto");
  let decipher = createDecipheriv("aes-256-ccm", process.env.SECRET);
  let decrypted = decipher.update(data, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}
