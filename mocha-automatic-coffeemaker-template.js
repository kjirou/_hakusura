module.exports = function(data) {
  return [
    "import assert from 'power-assert';",
    "",
    "import thisModule from '" + data.noExtensionFilePath + "';",
    "",
    "import { heading } from 'test/support/helpers';",
    "",
    "",
    "describe(heading(__filename), () => {",
    "",
    "  it('should be', () => {",
    "  });",
    "});"
  ].join('\n');
};
