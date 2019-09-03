var mongoose = require('mongoose'),
   Schema = mongoose.Schema,
   ObjectId = Schema.ObjectId;

var requestsSchema = new Schema({
    id: ObjectId,
    origin: {type: String},
    fecha: {type: Date}
}, { collection: 'requests' });

module.exports = mongoose.model('requests', requestsSchema);
