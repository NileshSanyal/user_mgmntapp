let _ = require("underscore");
var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });
var request = require('request');
var urlExists = require('url-exists');


let Utils = {

	inArray:function(array,ch){
		obj = _.find(array, function(obj) { return obj==ch.toString() })
		if ( obj!=undefined ) {
			return true;
	   } else {
		   return false;
	   }
		
	  },
	  inArrayObject:function(rules,findBy){
		var rules = _.findWhere(rules,findBy);
		if (!rules) {
			return false;
		}
		else {
			return true;
		}
				
	},

	 objectKeyByValue:function (obj, val) {
		return Object.entries(obj).find(i => i[1] === val);
	  },
	 // this is for only menu access permission wise
	 menuAccess:function (obj, val) {
		var splitted = val.split("/");
		if(splitted.length == 5){
			start   = val.lastIndexOf('/'); 
			val = val.substring(0, start)+'/:id';
		}
		return Object.entries(obj).find(i => i[1] === val);
	  },
	// Underscore replace by space //  
	humanize:function(str){
	
		var frags = str.split('_');
		for (i=0; i<frags.length; i++) {
		  frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
		}
		return frags.join(' ');
			
	},
	existsSync:function(filePath){
		var fullpath = upload_directory+filePath;
		try{
          fs.statSync(fullpath);
        }catch(err){
          if(err.code == 'ENOENT') return false;
        }
        return true;
      },

	toThousands: function (n) {
		return n.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},

	formatDollar:function(num) {
		num = Number(num);
		var p = num.toFixed(2).split(".");
		return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
			return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
		}, "") + "." + p[1];
	},

	clone: function (copyobj) {
		try {
			let tmpobj = JSON.stringify(copyobj);
			return JSON.parse(tmpobj);
		}
		catch (e) {
			return {};
		}
	},

	valEmail: function (email) {
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},

	safeparse: function(jsonString, def){
		return Utils.safeParseJson(jsonString, def);
	},
	
	safeParseJson: function (jsonString, def) {
		try {
			let o = JSON.parse(jsonString);
			// Handle non-exception-throwing cases:
			// Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
			// but... JSON.parse(null) returns null, and typeof null === "object",
			// so we must check for that, too. Thankfully, null is falsey, so this suffices:
			if (o) {
				return o;
			}
		}
		catch (e) {
			//winston.error(e.message);
		}
		return def;
	},
	
	evalJSON: function (jsonString) {
		try {
			//let o = JSON.parse(jsonString);
			let o = JSON.parse(JSON.stringify(jsonString));
			
			// Handle non-exception-throwing cases:
			// Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
			// but... JSON.parse(null) returns null, and typeof null === "object",
			// so we must check for that, too. Thankfully, null is falsey, so this suffices:
			if (o && typeof o === "object") {
				return o;
			}
		}
		catch (e) {
		
		}
		return false;
	},

	toObjectId:function(str) {
		
		if (typeof str === 'string') {
			return /^[a-f\d]{24}$/i.test(str);
		} else if (Array.isArray(str)) {
			return str.every(arrStr => /^[a-f\d]{24}$/i.test(arrStr));
		}
		return false;
		},
	orderNumber:function() {
		let now = Date.now().toString() // '1492341545873'
		// pad with extra random digit
		now += now + Math.floor(Math.random() * 10)
		// format
		return  ['ORD',now.slice(0, 14)].join('-')
		},
		isProductAttribute:function(array,ch){
		
				obj = _.filter(array, function(obj) { return obj.attribute_id.toString()==ch.toString() })
				return obj;
				
		},
		awsThumbGenerate:function(file_object,upload_folder){
			var location = file_object[0].location;
			var uploadImageArr = file_object[0].key.split("/");
			var image_name = uploadImageArr[1];
			var mime_type = file_object[0].mimetype;
			gm(request(location))
			.resize(150)
			.stream(function(err, stdout, stderr) {
				var chunks = [];
				stdout.on('data', function (chunk) {
					chunks.push(chunk);
				});
				stdout.on('end', function () {
					var image = Buffer.concat(chunks);
					var s3_options = {
						Bucket: config.AWS_BUCKET,
						Key: upload_folder+"/thumb/"+image_name,
						Body: image,
						ACL: 'public-read',
						ContentType: mime_type,
						ContentLength: image.length
					}
					s3.upload(s3_options, (err, data) => {
						return true;
					
					})
				});
				
			  });
			  return true;
		  },
		  isLinkExist:function(url) {
			 urlExists(url, function(err, exists) {
				if(exists) {
					return true;
				} else {
					return false;
				}
			  });
			
		},
		
};


module.exports = Utils;
