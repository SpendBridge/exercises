const requirePromise = (mod, fn) =>
    require('util').promisify(require(mod)[fn]);
    // A nifty trick, see https://medium.com/@styfle/promises-in-node-js-8-x-core-d6a8a93e85a2

const readFile = requirePromise('fs', 'readFile');
const writeFile = requirePromise('fs', 'writeFile');

const fileToArray = (path) => readFile(path, 'utf8')
    .then(str => str.split('\n'))
    .then(arr => arr.filter(removeEmpty))
    .then(arr => arr.map(toUpper))
    .catch(console.error);

const removeEmpty = str => str !== '';
const toUpper = str => str.slice(0, 1).toUpperCase() + str.slice(1);

const getRandom = (arr) => arr[Math.floor((Math.random() * arr.length))];
const getAccountNumber = () => Math.random().toString().slice(3, 5) + '-' + Math.random().toString().slice(3, 5) + '-' + Math.random().toString().slice(3, 5);
const getEmail = (fullName, accountName) => `${fullName.split(' ')[0]}.${fullName.split(' ')[1]}@${accountName}.com`;

const toUsersArray = (values) => {
    const [femaleNames, maleNames, lastNames, states] = values;
    const length = Math.min(femaleNames.length, maleNames.length, lastNames.length);
    let users = [];
    for (let i = 0; i < length; i++) {
        if (i % 5 === 0) {
            const femaleName = femaleNames[i];
            const maleName = maleNames[i];
            lastNames.forEach(lastName => {
                let fullName = '';
                if (i % 3 === 0) {
                    fullName = `${femaleName} ${lastName}`;
                }
                if (i % 6 === 0) {
                    fullName = `${maleName} ${lastName}`;
                }

                if (fullName) {
                    const accountName = getRandom(states);
                    const accountNumber = getAccountNumber();
                    const email = getEmail(fullName, accountName);
                    users.push({ fullName, email, accountName, accountNumber });
                }
            });
        }
    }
    /*
    console.log('Total', users.length);
    console.log('First', users[0]);
    console.log('x', users[500]);
    console.log('x', users[1000]);
    console.log('x', users[3000]);
    console.log('Last', users[users.length - 1]);
    */
    return users;
};

const reads = [
    fileToArray('./scripts/txt/female_first.txt'),
    fileToArray('./scripts/txt/male_first.txt'),
    fileToArray('./scripts/txt/last.txt'),
    fileToArray('./scripts/txt/states.txt'),
];


Promise.all(reads)
    .then(toUsersArray)
    .then((data) => writeFile('./data/users.json', JSON.stringify(data), 'utf8'))
    .catch(console.error);

