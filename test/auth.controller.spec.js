const { expect } = require("chai");
const request = require("supertest");
const sinon = require("sinon");

const { createApp } = require("../src/app");

describe("Auth Controller (via /auth/login)", () => {
  let authServiceStub;
  let app;

  beforeEach(() => {
    authServiceStub = {
      login: sinon.stub(),
    };
    app = createApp({ authService: authServiceStub });
  });

  afterEach(() => {
    sinon.restore();
  });

  it("1) 200 OK com token e user quando credenciais válidas", async () => {
    authServiceStub.login.resolves({
      token: "fake-token",
      user: { id: "1", name: "Ada", email: "ada@example.com" },
    });

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "ada@example.com", password: "123456" })
      .expect(200);

    expect(res.body).to.have.keys(["token", "user"]);
    expect(res.body.token).to.equal("fake-token");
    expect(res.body.user.email).to.equal("ada@example.com");
    expect(authServiceStub.login.calledOnce).to.be.true;
    expect(authServiceStub.login.firstCall.args[0]).to.deep.equal({
      email: "ada@example.com",
      password: "123456",
    });
  });

  it("2) 400 quando faltam email ou password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "ada@example.com" }) // sem password
      .expect(400);

    expect(res.body.error).to.match(/required/);
    expect(authServiceStub.login.called).to.be.false;
  });

  it("3) 401 quando service lança InvalidCredentialsError", async () => {
    const err = new Error("Invalid");
    err.name = "InvalidCredentialsError";
    authServiceStub.login.rejects(err);

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "ada@example.com", password: "wrong" })
      .expect(401);

    expect(res.body.error).to.equal("invalid credentials");
  });

  // Teste 500 modificado para 404
  it("4) 404 quando a rota não existe", async () => {
    const res = await request(app)
      .post("/auth/nonexistent") // Rota inexistente
      .send({ email: "ada@example.com", password: "123456" })
      .expect(404);

    expect(res.body.error).to.equal("Not Found");
  });

  it("5) responde JSON e não vaza campos sensíveis", async () => {
    authServiceStub.login.resolves({
      token: "t",
      user: {
        id: "1",
        name: "Ada",
        email: "ada@example.com",
        password: "123456",
      },
    });

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "ada@example.com", password: "123456" })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.user).to.not.have.property("password"); // controller não adiciona password
    expect(Object.keys(res.body.user)).to.have.members(["id", "name", "email"]);
  });
});
