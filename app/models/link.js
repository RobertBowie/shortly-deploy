var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var linkSchema = new Schema({
  id:  Number,
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,
  timestamp: Date
});

var Link = mongoose.model('link', linkSchema);

Link.initialize = function () {
     this.on('creating', function(model, attrs, options){
       var shasum = crypto.createHash('sha1');
       shasum.update(model.get('link'));
       model.set('code', shasum.digest('hex').slice(0, 5));
     });
};


// var db = require('../config');
// var crypto = require('crypto');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
