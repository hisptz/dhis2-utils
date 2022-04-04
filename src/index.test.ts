import {helloWorld} from "./index";


describe("Hello world test", () => {
    it("should say hello world", () => {
        expect(helloWorld()).toBe("Hello World!");
    });
})
