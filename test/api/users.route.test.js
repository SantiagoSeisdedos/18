import supertest from "supertest";
import * as chai from "chai";

import { ServerAPI } from "../../src/app/app.js";
import {
  connectMongoDB,
  disconnectMongoDB,
} from "../../db/execution.config.js";
import { createMockUserDataWithout } from "../utils/test-utils.js";
import { usersService } from "../../src/services/users.service.js";

chai.should();
const { expect } = chai;

const TEST_PORT = "9090";
const baseURL = `http://localhost:${TEST_PORT}`;
const requester = supertest(baseURL);

const password = "la contraseña";
const createUserValidData = {
  name: "el nombre",
  lastName: "el apellido",
  password,
  email: "el email",
};

describe("Server API", () => {
  const server = new ServerAPI();

  before(function () {
    this.timeout(20000);
  });

  before(async () => {
    await connectMongoDB();
    await server.startServer(TEST_PORT);
  });

  after(async () => {
    await disconnectMongoDB();
    await server.closeServer();
  });

  beforeEach(async () => {
    try {
      const deletedUser = await usersService.deleteUser(
        createUserValidData.email
      );
    } catch (error) {
      console.log("error", error);
    }
  });

  describe("POST /api/users", function () {
    describe("Register user with valid data", function () {
      it("should return the user created and a status 201", async () => {
        const { body } = await requester
          .post("/api/users")
          .send(createUserValidData)
          .expect(201);

        body.should.have.property("name").to.be.equal(createUserValidData.name);
        body.should.have
          .property("lastName")
          .to.be.equal(createUserValidData.lastName);
        body.should.have
          .property("email")
          .to.be.equal(createUserValidData.email);
        body.should.have.property("rol").to.be.equal("user");
        body.should.have
          .property("profilePicture")
          .to.be.equal("./static/imgs/default-user-avatar.png");
        body.should.have.property("timestamp");
        body.should.have.property("_id");
      });
    });
  });
});
