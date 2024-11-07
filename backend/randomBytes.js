// randomBytes.js
const crypto = require('crypto');
const randomString = crypto.randomBytes(256).toString('base64');
console.log(randomString);
