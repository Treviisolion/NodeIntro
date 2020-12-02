const fs = require('fs');
const axios = require('axios');

const cat = file => {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            // handle possible error
            console.error(err);
            // kill the process and tell the shell it errored
            process.exit(1);
        }
        // otherwise success
        console.log(data);
    });
};

const webCat = website => {
    axios.get(website).then(data => console.log(data.data)).catch(e => console.log(e))
}

const argv = process.argv;
if (argv[2].slice(0, 4) === 'http') {
    webCat(argv[2])
} else {
    cat(argv[2])
}