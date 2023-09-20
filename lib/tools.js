module.exports = {
	dbDESKexist() {
		var fs = require('fs');
		var dbname = 'MDT_810-0042-270.db';
		var db = "";

		if (fs.existsSync("./builds/desktop/data/" + dbname)) {
			msg = "dB FOUND!";
		} else {
			msg = "dB NOT FOUND!!!!";	
		};
		return msg;
	},
	dbWEBexist() {
		var fs = require('fs');
		var dbname = 'MDT_810-0042-270.db';
		var db = "";

		if (fs.existsSync("./builds/web/data/" + dbname)) {
			msg = "dB FOUND!";
		} else {
			msg = "dB NOT FOUND!!!!";
		};
		return msg;
	}
};