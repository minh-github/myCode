const fs = require('fs/promises');

async function writeFile(object) {
  try {
    const content = object;
    console.log(object);
    await fs.writeFile('./log.js', content);
  } catch (err) {
    console.log(err);
  }
}
export { writeFile }