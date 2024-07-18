import { Plugin, defineConfig, mergeConfig } from "vite";
import react from "@vitejs/plugin-react";
import sharp from "sharp";
import { rimrafSync } from "rimraf";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// Расширяем тип ServerOptions, добавляя свойство middleware
interface ExtendedServerOptions {
  middleware?: ((req: Request, res: Response, next: () => void) => void)[];
}

const serverOptions: ExtendedServerOptions = {
  middleware: [
    (req, res, next) => {
      if (req.url?.endsWith(".ts")) {
        res.headers.set("Content-Type", "application/javascript");
      }
      next();
    },
  ],
};

function changeManifestNamePlugin(): Plugin {
  return {
    name: "change-manifest-name",
    apply: "build",
    closeBundle() {
      const distDir = resolve(__dirname, "dist");
      const manifestPath = resolve(distDir, "manifest.json");
      const customJsonPath = resolve(__dirname, "./src/mock/params.json"); // путь к вашему JSON файлу

      try {
        // Чтение файла manifest.json
        const manifestData = JSON.parse(readFileSync(manifestPath, "utf-8"));

        // Чтение значения name из custom.json
        const customData = JSON.parse(readFileSync(customJsonPath, "utf-8"));
        const newName = customData.name;
        const newShortName = customData.name;

        // Изменение параметра name в manifest.json
        manifestData.name = newName;
        manifestData.short_name = newShortName;

        // Запись изменений обратно в manifest.json
        writeFileSync(
          manifestPath,
          JSON.stringify(manifestData, null, 2),
          "utf-8"
        );

        console.log(`Successfully updated name in manifest.json to ${newName}`);
      } catch (error) {
        console.error("Error updating manifest.json:", error);
      }
    },
  };
}

function imageResizePlugin(): Plugin {
  return {
    name: "vite-plugin-image-resize",
    apply: "build",
    async buildEnd() {
      const inputImagePath = "./public/img/logo.png";
      const outputDir = "./dist/icons/";

      const sizes = [
        {
          width: 512,
          height: 512,
          outputImagePath: "./dist/icons/512-512.png",
        },
        {
          width: 192,
          height: 192,
          outputImagePath: "./dist/icons/192-192.png",
        },
        {
          width: 144,
          height: 144,
          outputImagePath: "./dist/icons/144-144.png",
        },
        { width: 96, height: 96, outputImagePath: "./dist/icons/96-96.png" },
        { width: 72, height: 72, outputImagePath: "./dist/icons/72-72.png" },
        { width: 48, height: 48, outputImagePath: "./dist/icons/48-48.png" },
      ];

      rimrafSync(outputDir);

      const resizeImage = async (
        inputPath: string,
        outputPath: string,
        width: number,
        height: number
      ) => {
        try {
          const info = await sharp(inputPath)
            .resize(width, height)
            .toFile(outputPath);
          console.log(
            `Image resized to ${width}x${height} successfully:`,
            info
          );
        } catch (err) {
          console.error(`Error resizing image to ${width}x${height}:`, err);
        }
      };
      setTimeout(() => {
        sizes.forEach((size) => {
          resizeImage(
            inputImagePath,
            size.outputImagePath,
            size.width,
            size.height
          );
        });
      }, 1000);
    },
  };
}

export default mergeConfig(
  defineConfig({
    plugins: [imageResizePlugin(), changeManifestNamePlugin(), react()],
  }),
  {
    server: serverOptions,
  }
);
