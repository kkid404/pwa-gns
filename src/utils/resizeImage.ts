import sharp from "sharp";

export default function resizeImage() {
const inputImagePath = "./your_img/logo.png";

const sizes = [
  { width: 512, height: 512, outputImagePath: "./resized_img/512-512.png" },
  { width: 192, height: 192, outputImagePath: "./resized_img/192-192.png" },
  { width: 144, height: 144, outputImagePath: "./resized_img/144-144.png" },
  { width: 96, height: 96, outputImagePath: "./resized_img/96-96.png" },
  { width: 72, height: 72, outputImagePath: "./resized_img/72-72.png" },
  { width: 48, height: 48, outputImagePath: "./resized_img/48-48.png" },
];

const resizeImage = (
  inputPath: string,
  outputPath: string,
  width: number,
  height: number
) => {
  return sharp(inputPath)
    .resize(width, height)
    .toFile(outputPath)
    .then((info) => {
      console.log(`Image resized to ${width}x${height} successfully:`, info);
    })
    .catch((err) => {
      console.error(`Error resizing image to ${width}x${height}:`, err);
    });
};

sizes.forEach((size) => {
  resizeImage(inputImagePath, size.outputImagePath, size.width, size.height);
});
}