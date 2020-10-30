const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "developer",
    password: "Daniela96.",
    database: "qrcode",
  },
});

app.use(cors());
app.use(express.json());

app.get("/qrcode", async (req, res) => {
  const qrcode = await knex("qrcode").select("*");
  res.json(qrcode);
});

app.post("/qrcode", async (req, res) => {
  const link = req.body.link;
  await knex("qrcode").insert({
    link: link
  });
  res.json();
});

app.put("/qrcode/:id", async (req, res) => {
  const id = req.params.id;
  const link = req.body.link;

  await knex("qrcode").where("id", "=", id).update({ link: link });
  res.json();
});

app.delete("/qrcode/:id", async (req, res) => {
  const id = req.params.id;

  await knex("qrcode").where("id", "=", id).del();
  res.json();
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
