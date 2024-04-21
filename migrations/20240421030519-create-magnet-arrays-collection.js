module.exports = {
  async up(db, client) {
    await db.createCollection('magnet-arrays');
  },

  async down(db, client) {
    await db.collection('magnet-arrays').drop;
  }
};
