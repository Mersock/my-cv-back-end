const mongoose = require('mongoose');
const connectionURL = 'mongodb://mongo-db/my-cv';

mongoose.connect(connectionURL, {
    useNewUrlParser: true
});