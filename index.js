const express = require("express");
const cors = require("cors");
const massive = require("massive");
const path = require("path");
const searchController = require("./controllers/searchController");
const tagController = require("./controllers/tagController");
const itemController = require("./controllers/itemController");

require("dotenv").config({ path: "./.env" });

const { SERVER_PORT, POSTGRES_URI } = process.env;

const app = express();
app.use(express.json());
app.use(cors());

massive({
   connectionString: POSTGRES_URI,
   ssl: {
      rejectUnauthorized: false,
   },
})
   .then((db) => {
      app.set("db", db);
      console.log("database connected");
   })
   .catch((err) => console.log(err));

app.get("/api/inventory", searchController.search);
app.put("/api/inventory/short-item", searchController.getShortItem);
app.put("/api/inventory/item", searchController.getItem);
app.put("/api/inventory/item/delete-image", itemController.deleteImage);
app.put("/api/inventory/item/add-image", itemController.addImage);

app.get("/api/tag/get-tags", tagController.getTags);
app.get("/api/tag/?value_id:value_id", tagController.getTag);
app.put("/api/tag/update-value", tagController.updateTagValue);
app.put("/api/tag/toggle-value-tag", tagController.toggleValueTag);
app.put("/api/tag/delete-tag", tagController.deleteTag);
app.post("/api/tag/create-tag", tagController.createTag);

// if (process.env.NODE_ENV === "production") {
app.use(express.static("client/build"));
app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
// }

// app.use((req, res, next) => {
//    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

app.listen(SERVER_PORT, () => console.log("Server Port: " + SERVER_PORT));
