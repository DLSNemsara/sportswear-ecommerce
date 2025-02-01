import { test, describe } from "node:test";
import assert from "node:assert";
import request from "supertest";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "../server.js";

dotenv.config();

describe("Database Connection Tests", () => {
  test("should connect to mongodb", async () => {
    const connect = await mongoose.connect(
      `${process.env.MONGODB_URL}/e-sportswear`
    );

    await new Promise((resolve) => {
      if (mongoose.connection.readyState === 1) {
        resolve();
      } else {
        mongoose.connection.on("open", resolve);
      }
    });

    assert.strictEqual(mongoose.connection.readyState, 1);
  });
});

describe("API Endpoint Tests", () => {
  test("should return API WORKING on GET /", async () => {
    const response = await request(app).get("/");
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.text, "API WORKING");
  });
});

describe("User API Tests", () => {
  test("should handle LOGIN", async () => {
    const response = await request(app).post("/api/user/login");
    assert.strictEqual(response.status, 200);
  });

  test("should handle REGISTER", async () => {
    const response = await request(app).post("/api/user/register");
    assert.strictEqual(response.status, 200);
  });

  test("should handle ADMIN", async () => {
    const response = await request(app).post("/api/user/admin");
    assert.strictEqual(response.status, 200);
  });

  test("should handle USER_DATA", async () => {
    const response = await request(app).post("/api/user/data");
    assert.strictEqual(response.status, 200);
  });

  test("should handle UPDATE_USER_DATA", async () => {
    const response = await request(app).put("/api/user/updateuser");
    assert.strictEqual(response.status, 200);
  });

  test("should handle FORGET_PASSWORD", async () => {
    const email = "test@example.com";
    const captchaToken = "testCaptchaToken";
    const response = await request(app).get(
      `/api/user/forgot-password?email=${encodeURIComponent(email)}&captchaToken=${captchaToken}`
    );
    assert.strictEqual(response.status, 200);
  });

  test("should handle ALL_USERS", async () => {
    const response = await request(app).post("/api/user/allusers");
    assert.strictEqual(response.status, 200);
  });
});

describe("Products API Tests", () => {
  test("should handle PRODUCT_LIST", async () => {
    const response = await request(app).get("/api/product/list");
    assert.strictEqual(response.status, 200);
  });

  test("should handle PRODUCT_SINGLE", async () => {
    const response = await request(app).post("/api/product/single");
    assert.strictEqual(response.status, 200);
  });
});

describe("User Cart API Tests", () => {
  test("should handle GET_USER_CART", async () => {
    const response = await request(app).post("/api/cart/get");
    assert.strictEqual(response.status, 200);
  });

  test("should handle ADD_USER_CART", async () => {
    const response = await request(app).post("/api/cart/add");
    assert.strictEqual(response.status, 200);
  });

  test("should handle UPDATE_USER_CART", async () => {
    const response = await request(app).post("/api/cart/update");
    assert.strictEqual(response.status, 200);
  });
});

test("should disconnect from mongodb", async () => {
  await mongoose.disconnect();
  assert.strictEqual(mongoose.connection.readyState, 0);
});

test("Exit", async () => {
  process.exit(0);
});
