import { BACK_GROUND_COLOR } from "../src";
import { generateGIf } from "../src/util/generateGIf";

test("test", async () => {
    const res = await generateGIf("Hello World", 123, BACK_GROUND_COLOR.TRANSPARENT, 10, 2, 10);
    expect(res).not.toBe(123);

});