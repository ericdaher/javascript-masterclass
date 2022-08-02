const ex3 = require("./ex3");

function ex4() {
  const database = ex3();
  database.execute = function (sqlCommand) {
    try {
      if (sqlCommand.startsWith("create table")) {
        return this.createTable(sqlCommand);
      }
      const message = `Syntax error: '${sqlCommand}'`;
      throw new DatabaseError(sqlCommand, message);
    } catch (e) {
      return e.message;
    }
  };
  return database;
}

const DatabaseError = function (statement, message) {
  this.statement = statement;
  this.message = message;
};

module.exports = ex4;
