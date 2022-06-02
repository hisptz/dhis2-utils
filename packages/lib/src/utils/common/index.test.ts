import {constructAppUrl, translateAccess, uid} from "./index";

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


describe("Translate Access Tests", () => {

    it("Should return an object", () => {
        expect(typeof translateAccess("")).toBe("object")
    })

    it("Should return read access when provided with r-----", () => {
        expect(translateAccess("r-----")).toBe({read: true, write: false})
    })

    it("Should return write access when provided with rw----", () => {
        expect(translateAccess("rw----")).toBe({read: true, write: true})
    })

    it("Should return read and write access when provided with rw-rw-", () => {
        expect(translateAccess("rw----")).toBe({read: true, write: true})
    })

})


describe("Construct App Url Tests", () => {

    it("Should return a string", () => {
        expect(typeof constructAppUrl("", {name: "", title: ""}, {major: 0, minor: 0, patch: 0})).toBe("string")
    })

    it("Should return a url ", () => {
        expect(constructAppUrl("http://localhost:8080/", {name: "test-app", title: "Test App"}, {major: 2, minor: 35, patch: 0})).toBe("http://localhost:8080/api/apps/test-app/")
    })

    it("Should return a url with format '' for servers lower than version 2.35.0", () => {
        expect(constructAppUrl("http://localhost:8080/", {name: "test-app", title: "Test App"}, {major: 2, minor: 34, patch: 0})).toBe("http://localhost:8080/api/apps/Test-App/index.html")
    })

    it("Should return a url with format '' for servers equal or higher than version 2.35.0", () => {
        expect(constructAppUrl("http://localhost:8080/", {name: "test-app", title: "Test App"}, {major: 2, minor: 35, patch: 0})).toBe("http://localhost:8080/api/apps/test-app/")
    })
})


