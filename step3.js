const fs = require('fs');
const axios = require('axios');

const cat = (file, callback) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            // handle possible error
            console.error(err);
            // kill the process and tell the shell it errored
            process.exit(1);
        }
        // otherwise success
        callback(data)
    });
};

const webCat = (website, callback) => {
    return axios.get(website)
        .then(data => {
            callback(data.data);
        })
        .catch(e => console.log(e))
}

const writeFile = (filename, data) => {
    fs.writeFile(filename, data, 'utf8', function (err) {
        if (err) {
            console.log(err)
            process.exit(1)
        }
    });
};

const determineFileorUrl = (argument, callback) => {
    if (argument.slice(0, 4) === 'http') {
        webCat(argument, callback);
    } else {
        cat(argument, callback);
    }
};

const decideBehavior = arguments => {
    if (arguments[2] === '--out') {
        determineFileorUrl(arguments[4], data => writeFile(arguments[3], data));
    } else {
        determineFileorUrl(arguments[2], data => console.log(data));
    }
};

const argv = process.argv;
decideBehavior(argv);