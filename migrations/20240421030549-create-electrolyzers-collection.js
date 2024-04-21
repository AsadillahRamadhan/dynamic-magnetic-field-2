module.exports = {
  async up(db, client) {
    await db.createCollection('electrolyzers');
  },

  async down(db, client) {
    await db.collection('electrolyzers').drop;
  }
};
