import { BACK_GROUND_COLOR } from "../src";
import { generateGIf } from "../src/util/generateGIf";

test("test", async () => {
    const res = await generateGIf("Elia", 123, BACK_GROUND_COLOR.BLACK, 10, 10, 10);
    expect(res).not.toBe(123);

});