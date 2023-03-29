import request from "supertest";
import Server from "../../infrastructure/driving-adapters/api/Server";
import { UserAttributes } from "../../domain/entities/user";

//pruebas de integración para los usuarios

describe("TEST USER", () => {
  //pruebas de integración para la ruta /user
  describe("GET /user", () => {
    //Verifica que la ruta devuelva un arreglo de usuarios y estado 200
    test("should return Users", async () => {
      const response = await request(new Server().app).get("/user");
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((user: UserAttributes) => {
        expect(user.id_user).toBeDefined();
        expect(user.name).toBeDefined();
        expect(user.password).toBeDefined();
        expect(user.salt).toBeDefined();
        expect(user.username).toBeDefined();
      });
    });
  });

  //pruebas de integración para la ruta /user/login
  describe("GET /user/login", () => {
    //Verifica que el username exista antes de consultar la contraseña
    test("should return status code 400 if username not exist", async () => {
      const response = await request(new Server().app)
        .get("/user/login")
        .send({ username: "prueba", password: "123456" });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual("no user with the given username");
    });

    //Verifica que el username y el password sean iguales
    test("should return status code 200 and message 'wrong password or username'", async () => {
      const response = await request(new Server().app)
        .get("/user/login")
        .send({ username: "man1212", password: "123456" });
      expect(response.statusCode).toBe(200);
      expect(response.text).toEqual("wrong password or username");
    });

    //Verifica que se envien los parametros necesarios para el login
    test("should return status code 400 and message 'missing password or username'", async () => {
      const response = await request(new Server().app)
        .get("/user/login")
        .send({ password: "1234" });
      expect(response.statusCode).toBe(400);
      expect(response.text).toEqual("missing password or username");
    });
  });

  //Pruebas POST en la ruta /user
  describe("POST /user", () => {
    //Verifica que envien todos los parametros necesarios para crear un usuario
    test("should return status code 400 and message ''missing fields", async () => {
      const response = await request(new Server().app).post("/user").send({
        username: "user",
        password: "password",
      });
      expect(response.statusCode).toBe(400);
      expect(response.text).toEqual("missing fields");
    });

    //Verifica si el usuario ya existe
    test("should return status code 400 and message 'ya existe'", async () => {
      const response = await request(new Server().app).post("/user").send({
        username: "man1212",
        password: "123456",
        name: "josue leiva",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual("ya existe");
    });
  });

  //Pruebas DELETE en la ruta /user
  describe("DELETE /user/:id", () => {
    //Verifica si envia el id en la url
    test("should return status code 404 and message 'invalid request, check url'", async () => {
      const response = await request(new Server().app).delete("/user");
      expect(response.statusCode).toBe(404);
      expect(response.text).toEqual("invalid request, check url");
    });

    //Verifica si el id existe antes de eliminar
    test("should return status code 400 if user id not exist", async () => {
      const response = await request(new Server().app).delete("/user/124");
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual(
        "No existe ningun usuario con el identificador proporcionado"
      );
    });
  });

  //Pruebas PUT en la ruta /user
  describe("PUT /user/:id", () => {
    //Verifica que envian los parametros para el update
    test("should return status code 400 if missing parameters", async () => {
      const response = await request(new Server().app).put("/user/124");
      expect(response.statusCode).toBe(400);
      expect(response.text).toEqual("missing required fields");
    });

    //Verifica si existe el id para actualizar
    test("should return status code 400 if user ID not exist", async () => {
      const response = await request(new Server().app).put("/user/124").send({
        name: "garcia",
        username: "user1234",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual(
        "No existe ningun usuario con el identificador proporcionado"
      );
    });

    //Verifica si el usuario es actualizado correctamente
    test("should return status code 201 and 'user updated successfully'", async () => {
      const response = await request(new Server().app)
        .put("/user/4aedcd7e-dff1-4926-862c-2b7567496e96")
        .send({
          name: "Josué García",
          username: "man1212",
        });
      expect(response.statusCode).toBe(201);
      expect(response.text).toEqual("user updated successfully");
    });
  });
});
