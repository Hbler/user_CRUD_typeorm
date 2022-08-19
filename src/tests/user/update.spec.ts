import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import app from "../../app";
import request from "supertest";

describe("Teste para metodo PATCH em /users/:id", () => {
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

  let testUser2: User = {
    name: "Ugo Kenzie",
    email: "ugo@kenzie.com",
    password: "123456Ab!",
    age: 18,
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

  test("Tentando atualizar um usuário", async () => {
    const responsePatch = await request(app)
      .patch(`/users/${response1.body.id}`)
      .send(testUser2);

    const responseGet = await request(app).get(`/users/${response1.body.id}`);

    expect(responsePatch.status).toEqual(200);
    expect(responsePatch.body).toHaveProperty("message");

    expect(responseGet.body).toEqual(
      expect.objectContaining({
        id: responseGet.body.id,
        name: testUser2.name,
        email: testUser2.email,
        age: testUser2.age,
        created_at: responseGet.body.created_at,
        updated_at: responseGet.body.updated_at,
      })
    );
  });

  test("Tentando atualizar um usuário que não existe", async () => {
    const response = await request(app).get(`/users/1`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message");
  });
});
