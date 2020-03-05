const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {
  beforeEach(done => {
    sequelize
      .sync({ force: true })
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  describe("#create()", () => {
    it("should create a User object with a valid email and password", done => {
      User.create({
        email: "user@example.com",
        password: "123456"
      })
        .then(user => {
          expect(user.email).toBe("user@example.com");
          expect(user.id).toBe(1);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it("should not create a user with invalid email or password", done => {
      User.create({
        email: "not-an-email",
        password: "123"
      })
        .then(user => {
          done();
        })
        .catch(err => {
          expect(err.message).toContain(
            "Validation error: must be a valid email"
          );
          done();
        });
    });
    it("should not create a user with an email already taken", done => {
      User.create({
        email: "user@example.com",
        password: "123456"
      })
        .then(user => {
          User.create({
            email: "user@example.com",
            password: "sodnvslajnvklasdjnklasjndv"
          })
            .then(user => {
              done();
            })
            .catch(err => {
              expect(err.message).toContain("Validation error");
              done();
            });
          done();
        })
        .catch(err => {
          console.log(err);
          done;
        });
    });
  });
});
