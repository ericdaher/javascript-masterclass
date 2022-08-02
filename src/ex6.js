const ex5 = require("./ex5");

function ex6() {
  const database = ex5();
  database.execute = function (sqlCommand) {
    try {
      if (sqlCommand.startsWith("create table")) {
        return this.createTable(sqlCommand);
      } else if (sqlCommand.startsWith("insert")) {
        return this.insertInTable(sqlCommand);
      } else if (sqlCommand.startsWith("select")) {
        return this.selectFromTable(sqlCommand);
      } else {
        const message = `Syntax error: '${sqlCommand}'`;
        throw new DatabaseError(sqlCommand, message);
      }
    } catch (e) {
      return e.message;
    }
  };
  database.selectFromTable = function (sqlCommand) {
    return selectFromTable(this, sqlCommand);
  };
  return database;
}

function selectFromTable(databaseObject, sqlCommand) {
  const regExp =
    /select ([a-z, ]+) from ([a-z]+)(?: where ([a-z]+) = ([\w]+))?/;
  const [_, tableColumns, tableName, whereColumn, whereValue] =
    regExp.exec(sqlCommand);
  const tableObjects = databaseObject.tables[tableName].data
    .filter((tableElement) => tableElement[whereColumn] === whereValue)
    .map((tableElement) => {
      return tableColumns
        .split(", ")
        .reduce(
          (object, elementRow) =>
            Object.assign(object, { [elementRow]: tableElement[elementRow] }),
          {}
        );
    });
  return tableObjects;
}

const DatabaseError = function (statement, message) {
  this.statement = statement;
  this.message = message;
};

module.exports = ex6;
