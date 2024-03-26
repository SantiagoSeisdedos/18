import "dotenv";
import supertest from "supertest";
import * as chai from "chai";

import { ServerAPI } from "../../src/app/app.js";
import {
  connectMongoDB,
  disconnectMongoDB,
} from "../../db/execution.config.js";

import { productsService } from "../../src/services/products.service.js";

import { createMockUserDataWithout } from "../utils/test-utils.js";
import { areHashesEqual } from "../../src/utils/crypto.js";

chai.should();

const TEST_PORT = "9090";
const baseURL = `http://localhost:${TEST_PORT}`;
const requester = supertest(baseURL);

const createProductValidData = {
  _id: "1test",
  title: "Test Product",
  description: "Test Product Description",
  price: 100,
  thumbnail: ["test.jpg"],
  code: "TEST-CODE",
  stock: 10,
  category: "Test",
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
    await productsService.deleteOne(createProductValidData._id);
    await disconnectMongoDB();
    await server.closeServer();
  });

  describe("GET /api/products", function () {
    it("should return an array of products with a status 200", async () => {
      try {
        const { body } = await requester.get("/api/products").expect(200);
        body.should.be.a("array");
      } catch (error) {
        console.log("GET /api/products TEST error", error);
      }
    });
  });

  describe("POST /api/products", function () {
    it("should return the product created and a status 201 with valid data", async () => {
      try {
        // TODO: Add login to get token (UNCOMMENT PRODUCT ROUTE MIDDLEWARES)
        // const { data } = await axios.post(`${baseURL}/api/sessions`, {
        //   email: TESTING_EMAIL_USER,
        //   password: TESTING_EMAIL_PASSWORD,
        // });
        // console.log("01 POST /api/products TEST data: ", data);

        const { body } = await requester
          .post("/api/products")
          .send(createProductValidData)
          .expect(201);

        body.should.be.a("object");
        body.should.have
          .property("title")
          .to.be.equal(createProductValidData.title);
        body.should.have
          .property("description")
          .to.be.equal(createProductValidData.description);
        body.should.have
          .property("price")
          .to.be.equal(createProductValidData.price);
        body.should.have.property("thumbnail");
        body.should.have
          .property("code")
          .to.be.equal(createProductValidData.code);
        body.should.have
          .property("stock")
          .to.be.equal(createProductValidData.stock);
        body.should.have
          .property("category")
          .to.be.equal(createProductValidData.category);

        return;
      } catch (error) {
        console.log("03 POST /api/products TEST error", error);
      }
    });

    it("should return an error with invalid data and status 400", async () => {
      try {
        const { body } = await requester
          .post("/api/products")
          .send({ title: "Test Product" })
          .expect(400);

        body.should.be.a("object");
        body.should.have
          .property("message")
          .to.be.equal(
            "INCORRECT_DATA: Validation failed. Product data is invalid."
          );
        body.should.have.property("status").to.be.equal("error");
        return;
      } catch (error) {
        console.log("POST /api/products CATCH: ", error);
      }
    });
  });
});
