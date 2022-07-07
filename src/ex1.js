function ex1(input) {
  let regExp = /[a-z]+ [a-z]+ ([a-z]+) \((.+)\)/;
  let result = regExp.exec(input);
  return { tableName: result[1], columns: result[2].split(', ')}
}

module.exports = ex1;
