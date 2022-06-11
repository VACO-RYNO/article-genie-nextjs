import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(
    process.cwd(),
    `/public/javascript/genieScript.js`,
  );

  try {
    const file = fs.readFileSync(filePath);

    res.send(file);
  } catch (error) {
    res.status(400).json({ error: { message: error } });
  }
}
