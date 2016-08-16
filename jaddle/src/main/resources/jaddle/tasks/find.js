(function() {
	var imports = new JavaImporter(org.apache.commons.io);

	with (imports) {
		var find = function(work, term) {
			var files = FileUtils.listFiles(work, null, true);
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				var long = file.getName();
				// var name = FilenameUtils.getBaseName(file);
				// var ext = FilenameUtils.getExtension(file);
				if (long.equalsIgnoreCase(term) && file.canExecute())
					return file;
			}
			return null;
		};
		return {
			exec : function(work, args, env) {
				var ret = [];
				for (var i = 0; i < args.length; i++) {
					var arg = args[i];
					var res = find(work, arg);
					print(arg + ' = ' + res);
					ret.push(res);
				}
				return ret;
			}
		}
	}
});