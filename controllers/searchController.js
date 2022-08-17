function convertItem(item) {
   item.sku = { value: item.sku };
   item.serial = { value: item.serial };
   item.title = { value: item.title };
   return item;
}

module.exports = {
   search: async (req, res) => {
      const db = req.app.get("db");
      const items = await db.search();
      const inventory = [];
      items.forEach((item) => inventory.push(convertItem(item)));
      res.status(200).send(inventory);
   },

   getItem: async (req, res) => {
      const { id } = req.body;
      console.log(id);
      const db = req.app.get("db");
      const response = await db.get_item(id);
      const item = convertItem(response[0]);
      res.status(200).send(item);
   },
};
