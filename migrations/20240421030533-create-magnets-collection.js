module.exports = {
  async up(db, client) {
    await db.createCollection('magnets');
  },

  async down(db, client) {
    await db.collection('magnets').drop;
  }
};
