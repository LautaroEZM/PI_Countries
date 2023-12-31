const server = require("./src/server");
const { conn } = require('./src/db.js');
const { populateDb } = require('./src/controllers/country.js')
const PORT = 3001;


conn.sync({ force: false }).then(() => {
  populateDb().then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    })
  })
}).catch(error => console.error(error))
