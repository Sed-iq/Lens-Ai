const child = require("child_process");
const cloudinary = require("./cloudinary");
const random = require("./random");
const streamifier = require("streamifier");
const fs = require("fs");
const path = require("path");
var err = {
  state: false,
};
var seed = random(6);
var Image_chunk;
module.exports = async (req, res) => {
  // Run python child
  const exec = child.exec(`python modules/generator.py`);
  exec.stdin.write(
    `${seed}\n${process.env.STABILITY_HOST}\n${process.env.STABILITY_KEY}\n${req.body.prompt}`
  );
  exec.stderr.on("data", (chunk) => {
    if (chunk) {
      (err.state = true), (err.message = chunk);
    }
  });
  exec.stdout.on("data", (chunk) => {
    if (chunk) Image_chunk = chunk;
  });
  exec.on("close", () => {
    if (err.state == false) {
      fs.readFile(path.join(__dirname, `../${seed}.png`), (err, data) => {
        if (err) console.error(err);
        else {
          Save(data, res);
        }
      });
    } else {
      console.log(err.message);
      res.status(401).end("");
    }
  });
  exec.stdin.end();
};
function Save(bytecode, res) {
  const save = cloudinary.uploader.upload_stream(
    {
      folder: "lens/image",
    },
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.json(result.secure_url);
      }
    }
  );
  streamifier.createReadStream(bytecode).pipe(save);
}
