import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import app from "../../app";
import request from "supertest";

describe("Teste para metodo DELETE em /users/:id", () => {
  let connection: DataSource;

  interface User {
    name: string;
    email: string;
    password?: string;
    age: number;
  }

  let testUser1: User = {
    name: "Daniel Kenzie",
    email: "daniel@kenzie.com",
    password: "123456Ab!",
    age: 21,
  };

  let response1: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    response1 = await request(app).post("/users").send(testUser1);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Tentando deletar um usuário", async () => {
    const responseDelete = await request(app).delete(
      `/users/${response1.body.id}`
    );

    expect(responseDelete.status).toEqual(200);
    expect(responseDelete.body).toHaveProperty("message");
  });

  test("Tentando deletar um usuário que não existe", async () => {
    const response = await request(app).get(`/users/1`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message");
  });
});
