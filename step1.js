const fs = require('fs');

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

const argv = process.argv;
cat(argv[2])