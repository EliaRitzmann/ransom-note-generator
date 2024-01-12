import { generateImage } from "../src/util/generateImage";

test("generateImageTest", async () => {
  const result = await generateImage("Hello World", 123, "transparent", 10);
  expect(result).not.toBe(123);
  expect(result).toBeInstanceOf(Buffer);
});


