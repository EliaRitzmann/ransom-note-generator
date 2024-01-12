import { generateRansomNote } from '../src';

test('adds two numbers correctly', async () => {
  const result = await generateRansomNote("Hello World")
  expect(result.seed).not.toBe(123);
});

test('adds two numbers ', async () => {
    const result = await generateRansomNote("Hello World", {seed: 123})
    expect(result.seed).toBe(123);
  });