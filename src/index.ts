import { generateImage } from "./generate";

async function image(){
  const result = await generateImage("Hello World", 1234);
  console.log(result);
}

image();
