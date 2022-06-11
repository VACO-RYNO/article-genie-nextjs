import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(
    process.cwd(),
    `/public/stylesheets/genieStyle.css`,
  );

  try {
    const file = fs.readFileSync(filePath);

    res.setHeader("Content-Type", "text/css");
    res.send(file);
  } catch (error) {
    res.status(400).json({ error: { message: error } });
  }
}
