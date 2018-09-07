import { readFileSync, writeFileSync } from 'fs';

const FILE_NAME = 'age_clock.txt';

export function write_json_file(key, value) {
  const json_object = {};
  json_object[key] = value;
  writeFileSync(FILE_NAME, json_object, 'json');
}

export function read_json_file(key) {
  try {
    const json_object = readFileSync(FILE_NAME, 'json');
    return json_object[key];
  } catch (e) {
    return undefined;
  }
}