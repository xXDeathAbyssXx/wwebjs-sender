exports.tError = function (error) {
  throw new TypeError(`[ERROR]: ${error}`);
};

exports.rError = function (error) {
  throw new RangeError(`[ERROR]: ${error}`);
};

exports.sError = function (error) {
  throw new SyntaxError(`[ERROR]: ${error}`);
};

exports.rfError = function (error) {
  throw new ReferenceError(`[ERROR]: ${error}`);
};

exports.eError = function (error) {
  throw new Error(`[ERROR]: ${error}`);
};
