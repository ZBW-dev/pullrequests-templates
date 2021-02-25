const editJsonFile = require("edit-json-file");

const OUT_DIR = 'build';

const file = editJsonFile(`${OUT_DIR}/manifest.json`);
const version = file.get('version');

file.set("version", String(version.replace('-beta', '')));

file.save();
