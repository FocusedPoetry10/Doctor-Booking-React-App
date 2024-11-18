const bcrypt = require('bcryptjs');

const password = 'Shanttoosh'; // Replace with the desired password
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    console.log('Hashed Password:', hash);
});
