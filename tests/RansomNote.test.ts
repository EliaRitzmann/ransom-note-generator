import { RansomNote, BACK_GROUND_COLOR} from "../src/index";

test("generateBufferTest", async () => {
    const result = await RansomNote.generateBuffer("Hello World", {seed: 123, backgroundColor: BACK_GROUND_COLOR.TRANSPARENT, spacing: 10});
    expect(result).not.toBe(123);
    expect(result.imageBuffer).toBeInstanceOf(Buffer);
    });

test("InstantiateRansomNoteObjectWithValuesTest", async () => {
    const ransomNote = new RansomNote({ backgroundColor: BACK_GROUND_COLOR.TRANSPARENT, spacing: 10});
    expect(ransomNote).toBeInstanceOf(RansomNote);
    const result = await ransomNote.generateBuffer("Hello World");
});
