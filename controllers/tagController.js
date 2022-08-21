module.exports = {
   getTags: async (req, res) => {
      const db = req.app.get("db").tag;
      const response = await db.get_tags();
      res.status(200).send(response);
   },

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

   createTag: async (req, res) => {
      const { id, tag_id, value } = req.body;
      const db = req.app.get("db").tag;
      await db.create_tag([id, tag_id, value]);
   },

   toggleValueTag: async (req, res) => {
      const { tag } = req.body;
      const { value_id, value_type } = tag;
      const db = req.app.get("db").tag;
      if (value_type === "active") await db.disable_value_type([value_id]);
      else if (value_type === "disabled")
         await db.enable_value_type([value_id]);
      const response = await db.get_tag([value_id]);
      res.status(200).send(response[0]);
   },
};
