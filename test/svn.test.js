const path = require('path');
const fs = require('fs');
const parser = require('../index');

describe("svn specific tests", () => {

    const parse = (filename) => {
        return parser.parse(fs.readFileSync(path.resolve(__dirname, "svn", filename), 'utf-8'));
    };

    it("should handle whitespace in file name", () => {
        const diff = parse("add.diff");
        const file = diff[0];
        expect(file.type).toBe("add");
        expect(file.oldPath).toBe("/dev/null");
        expect(file.newPath).toBe("trunk/people/Han Solo.json");
        expect(file.newMode).toBe('100644');
    });
});