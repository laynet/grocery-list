const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000";

describe("routes : static", () => {
  describe("GET /", () => {
    it("shoudl return status code 200 and have 'INDEX TODO' in the body of the response ", done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("INDEX TODO");
        done();
      });
    });
  });
});
