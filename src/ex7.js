const ex6 = require("./ex6");

function ex7() {
  const database = ex6();
  database.execute = function (sqlCommand) {
    try {
      if (sqlCommand.startsWith("create table")) {
        return this.createTable(sqlCommand);
      } else if (sqlCommand.startsWith("insert")) {
        return this.insertInTable(sqlCommand);
      } else if (sqlCommand.startsWith("select")) {
        return this.selectFromTable(sqlCommand);
      } else if (sqlCommand.startsWith("delete")) {
        return this.deleteFromTable(sqlCommand);
      } else {
        const message = `Syntax error: '${sqlCommand}'`;
        throw new DatabaseError(sqlCommand, message);
      }
    } catch (e) {
      return e.message;
    }
  };
  database.deleteFromTable = function (sqlCommand) {
    return deleteFromTable(this, sqlCommand);
  };
  return database;
}

function deleteFromTable(databaseObject, sqlCommand) {
  const regExp = /delete from ([a-z]+)(?: where ([a-z]+) = ([\w]+))?/;
  const [_, tableName, whereColumn, whereValue] = regExp.exec(sqlCommand);
  databaseObject.tables[tableName].data = whereValue
    ? databaseObject.tables[tableName].data.filter(
        (tableElement) => tableElement[whereColumn] !== whereValue
      )
    : [];
  return databaseObject;
}

const DatabaseError = function (statement, message) {
  this.statement = statement;
  this.message = message;
};

module.exports = ex7;
