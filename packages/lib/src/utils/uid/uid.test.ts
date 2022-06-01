import uid from "./index";

describe("UID tests", () => {

    it("should return a string", () => {
        expect(typeof uid()).toBe("string")
    });

    it("should return a string with length of 11", () => {
        expect(uid().length).toBe(11);
    })

    it("should return a string that does not start with a number", () => {
        expect(isNaN(Number(uid().charAt(0)))).toBe(true)
    })
})
