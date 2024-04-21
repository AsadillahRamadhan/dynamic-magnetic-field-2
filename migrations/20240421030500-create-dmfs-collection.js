module.exports = {
  async up(db, client) {
    await db.createCollection('dmfs');
  },

  async down(db, client) {
    await db.collection('dmfs').drop;
  }
};
