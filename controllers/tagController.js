module.exports = {
   getTag: async (req, res) => {
      const { value_id } = req.params;
      const db = req.app.get("db").tag;
      const response = await db.get_tag([value_id]);
      res.status(200).send(response[0]);
   },

   updateTagValue: async (req, res) => {
      const { tag } = req.body;
      const { value, value_id } = tag;
      const db = req.app.get("db").tag;
      const response = await db.update_value([value_id, value]);
      if (response[0]) {
         const response = await db.get_tag([value_id]);
         return res.status(200).send(response[0]);
      }
      res.sendStatus(501);
   },
};
