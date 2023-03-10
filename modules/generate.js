const child = require("child_process");
const cloudinary = require("./cloudinary");
const random = require("./random");
var err = {
  state: false,
};
var seed = random(6);
var Image_chunk;
module.exports = async (req, res) => {
  // Run python child
  const exec = child.exec(`python modules/generator.py`);
  exec.stdin.write(seed);
  exec.stderr.on("data", (chunk) => {
    if (chunk) {
      (err.state = true), (err.message = chunk);
    }
  });
  exec.stdout.on("data", (chunk) => {
    if (chunk) Image_chunk = chunk;
  });
  exec.on("close", (chunk) => {
    if (err.state == false) {
      Save(Image_chunk)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).end();
        });
    } else {
      console.log(err.message);
      res.status(401).end("");
    }
  });
  exec.stdin.end();
};
async function Save(bytecode) {
  const save = await cloudinary.uploader.upload(bytecode, {
    folder: "lensai/gen_images",
    filename_override: `${seed}.jpg`,
  });
  return new Promise((resolve, reject) => {
    if (save !== null || save !== "") {
      resolve(save.secure_url);
    } else reject("File not saved");
  });
}
