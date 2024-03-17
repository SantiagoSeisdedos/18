import "dotenv";
import supertest from "supertest";
import * as chai from "chai";
import axios from "axios";

import { ServerAPI } from "../../src/app/app.js";
import {
  connectMongoDB,
  disconnectMongoDB,
} from "../../db/execution.config.js";

import {
  TESTING_EMAIL,
  TESTING_PASSWORD,
  TESTING_NAME,
  TESTING_LASTNAME,
} from "../../src/config/config.js";

import { productsService } from "../../src/services/products.service.js";
import { createMockUserDataWithout } from "../utils/test-utils.js";
import { areHashesEqual } from "../../src/utils/crypto.js";

chai.should();
const { expect } = chai;

const TEST_PORT = "9090";
const baseURL = `http://localhost:${TEST_PORT}`;
const requester = supertest(baseURL);

describe.only("Server API", () => {
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

  describe("POST /api/sessions", function () {
    it("should return the user session and a status 201", async () => {
      try {
        const { body } = await requester
          .post("/api/sessions")
          .send({
            email: TESTING_EMAIL,
            password: TESTING_PASSWORD,
          })
          .expect(201);

        body.should.be.a("object");
        body.should.have.property("name").equal(TESTING_NAME);
        body.should.have.property("lastName").equal(TESTING_LASTNAME);
        body.should.have.property("email");
        body.email.should.be.equal(TESTING_EMAIL);
        return;
      } catch (error) {
        console.log("POST /api/sessions CATCH: ", error);
      }
    });

    it("should return a status 401", async () => {
      try {
        const { body } = await requester
          .post("/api/sessions")
          .send({
            email: "invalid",
            password: "invalid",
          })
          .expect(401);

        expect(body).to.be.an("object");
        expect(body)
          .to.have.property("message")
          .to.be.equal("UNAUTHORIZED: Failed to authenticate user");
        expect(body).to.have.property("status").to.be.equal("error");
        return;
      } catch (error) {
        console.log("POST /api/sessions CATCH: ", error);
      }
    });
  });

  describe("DELETE /api/sessions/current", function () {
    it("should return a status 204", async () => {
      try {
        const { body } = await requester
          .delete("/api/sessions/current")
          .expect(204);

        console.log("DELETE /api/sessions/current body: ", body);
      } catch (error) {
        console.log("DELETE /api/sessions/current CATCH: ", error);
      }
    });
  });
});
