import sharp from "sharp";
import { fileURLToPath } from "node:url";

const input = fileURLToPath(new URL("../public/brand/amztrix-logo.png", import.meta.url));
const output = fileURLToPath(new URL("../public/brand/amztrix-logo-dark.png", import.meta.url));
const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const ivory = [242, 234, 216];

for (let offset = 0; offset < data.length; offset += 4) {
  const red = data[offset];
  const green = data[offset + 1];
  const blue = data[offset + 2];
  const saturation = Math.max(red, green, blue) - Math.min(red, green, blue);
  const isOrange = red > 150 && red > green * 1.25 && saturation > 55;

  if (isOrange) {
    const coverage = Math.min(255, Math.max(0, (255 - blue) * 1.18));
    data[offset] = Math.max(225, red);
    data[offset + 1] = Math.min(165, Math.max(120, green));
    data[offset + 2] = Math.min(38, blue);
    data[offset + 3] = coverage;
  } else {
    const luminance = red * .2126 + green * .7152 + blue * .0722;
    const coverage = Math.min(255, Math.max(0, (255 - luminance) * 1.08));
    data[offset] = ivory[0];
    data[offset + 1] = ivory[1];
    data[offset + 2] = ivory[2];
    data[offset + 3] = coverage;
  }
}

await sharp(data, { raw: info }).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(output);
