import { BACK_GROUND_COLOR } from "../src";
import { generateGIf } from "../src/util/generateGIf";

test("test", async () => {
    const res = await generateGIf("Elia", 123, BACK_GROUND_COLOR.TRANSPARENT, 10, 5, 100);
    expect(res).not.toBe(123);

});