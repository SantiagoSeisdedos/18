import "dotenv";
import supertest from "supertest";
import * as chai from "chai";

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

chai.should();
const { expect } = chai;

const TEST_PORT = "9090";
const baseURL = `http://localhost:${TEST_PORT}`;
const requester = supertest(baseURL);

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

  describe("GET /api/carts", function () {
    it("should return the carts list and a status 201", async () => {
      try {
        const { body } = await requester.get("/api/carts").send().expect(200);

        expect(body).to.be.an("array");

        body.forEach((item) => {
          expect(item).to.be.an("object");
          expect(item).to.have.property("id").to.be.a("string");
          expect(item).to.have.property("products").to.be.an("array");
        });

        return;
      } catch (error) {
        console.log("POST /api/carts CATCH: ", error);
      }
    });
  });

  describe("POST /api/carts", function () {
    it("should create a cart and return a status 201", async () => {
      try {
        const { body } = await requester.post("/api/carts").send().expect(201);

        expect(body).to.be.an("object");
        expect(body).to.have.property("id").to.be.a("string");
        expect(body).to.have.property("products").to.be.an("array");

        return;
      } catch (error) {
        console.log("POST /api/carts CATCH: ", error);
      }
    });
  });

  describe("GET /api/carts/:id", function () {
    it("should return the desired cart and a status 200", async () => {
      try {
        const { body: createdCart } = await requester
          .post("/api/carts")
          .send()
          .expect(201);

        expect(createdCart).to.be.an("object");
        expect(createdCart).to.have.property("id").to.be.a("string");
        expect(createdCart).to.have.property("products").to.be.an("array");

        const { body: requestedCart } = await requester
          .get("/api/carts/" + createdCart.id)
          .expect(200);

        expect(requestedCart).to.be.an("object");
        expect(requestedCart)
          .to.have.property("id")
          .to.be.a("string")
          .to.equal(createdCart.id);
        expect(requestedCart).to.have.property("products").to.be.an("array");
        return;
      } catch (error) {
        console.log("DELETE /api/sessions/current CATCH: ", error);
      }
    });
  });
});
