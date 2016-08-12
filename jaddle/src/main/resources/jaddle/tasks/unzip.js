(function() {
	var imports = new JavaImporter(java.io, org.apache.commons.io);

	with (imports) {
		var unzip = function(root, file) {
			var name = file.getName().toLowerCase();
			var kind = null;
			if (name.endsWith(".zip"))
				kind = "ZIP";
			if (name.endsWith(".tgz") || name.endsWith(".tar.gz"))
				kind = "TGZ";
			if (name.endsWith(".txz") || name.endsWith(".tar.xz"))
				kind = "TXZ";
			print(root + " / " + file + " / " + kind);
		};
		return {
			exec : function(work, args, env) {
				for (var i = 0; i < args.length; i++) {
					var path = args[i];
					unzip(work, new File(path));
				}
			}
		}
	}
});