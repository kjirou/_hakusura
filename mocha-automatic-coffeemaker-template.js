module.exports = function(data) {
  return [
    "import assert from 'power-assert';",
    "",
    "import { heading } from 'test/support/helpers';",
    "",
    "import thisModule from '" + data.noExtensionFilePath + "';",
    "",
    "",
    "describe(heading(__filename), () => {",
    "",
    "  it('should be', () => {",
    "  });",
    "});"
  ].join('\n');
};
