async function getImages(db, id) {
   const response = await db.get_images([id]);
   return response;
}

module.exports = {
   addImage: async (req, res) => {
      const { id, image } = req.body;
      const db = req.app.get("db").item;
      await db.add_image([id, image]);
      const newImages = await getImages(db, id);
      res.status(200).send(newImages);
   },

   deleteImage: async (req, res) => {
      const { image } = req.body;
      const db = req.app.get("db").item;
      await db.delete_image([image.id, image.image]);
      const newImages = await getImages(db, image.id);
      res.status(200).send(newImages);
   },
};
