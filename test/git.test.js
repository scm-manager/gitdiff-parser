const path = require('path');
const fs = require('fs');
const parser = require('../index');

describe("git specific tests", () => {

    const parse = (filename) => {
        return parser.parse( fs.readFileSync(path.resolve(__dirname, "git", filename), 'utf-8') );
    };

    it("should have type add", () => {
        const diff = parse("add.diff");
        const file = diff[0];
        expect(file.type).toBe("add");
        expect(file.oldPath).toBe("/dev/null");
        expect(file.newPath).toBe("a.txt");
    });

    it("should have type delete", () => {
        const diff = parse("rm.diff");
        const file = diff[0];
        expect(file.type).toBe("delete");
        expect(file.oldPath).toBe("a.txt");
        expect(file.newPath).toBe("/dev/null");
    });

    it("should have type rename", () => {
        const diff = parse("mv.diff");
        const file = diff[0];
        expect(file.type).toBe("rename");
        expect(file.oldPath).toBe("b.txt");
        expect(file.newPath).toBe("c.txt");
    });

    it("should have type modify", () => {
        const diff = parse("edit.diff");
        const file = diff[0];
        expect(file.type).toBe("modify");
        expect(file.oldPath).toBe("a.txt");
        expect(file.newPath).toBe("a.txt");
    });

    it("should parse filenames with whitespace", () => {
        const diff = parse("files_with_whitespace.diff");
        const file = diff[0];
        expect(file.type).toBe("modify");
        expect(file.oldPath).toBe("old file has spaces");
        expect(file.newPath).toBe("new file has spaces");
    });

    it("should parse added filename with whitespace", () => {
        const diff = parse("files_with_whitespace_add.diff");
        const file = diff[0];
        expect(file.type).toBe("add");
        expect(file.oldPath).toBe("/dev/null");
        expect(file.newPath).toBe("new file has spaces");
    });

    it("should parse deleted filename with whitespace", () => {
        const diff = parse("files_with_whitespace_delete.diff");
        const file = diff[0];
        expect(file.type).toBe("delete");
        expect(file.oldPath).toBe("old file has spaces");
        expect(file.newPath).toBe("/dev/null");
    });

    it("should parse binary files", () => {
        const diff = parse("binary.diff");
        const binary = diff[0];
        expect(binary.type).toBe("add");
        const next = diff[1];
        expect(next.newPath).toBe("Main.java");
    });

});