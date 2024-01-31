const app = require("express")();

app.get("/", (req, res) => {
  res.json({ Page: "This is the homepage." });
});

app.get("/first", (req, res) => {
  res.json({ Page: "This is the first page." });
});

app.get("/second", (req, res) => {
  res.json({ Page: "This is the second page." });
});

app.all("*", (req, res) => {
  res.status(404).send("Oops! Cannot find that page.");
});

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});
