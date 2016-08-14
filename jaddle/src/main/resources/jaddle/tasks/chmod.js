(function() {
	var imports = new JavaImporter(java.io, java.util, org.apache.commons.io);

	with (imports) {
		var chmod = function(root, given) {
			var files = Arrays.asList(given);
			if (given.isDirectory())
				files = FileUtils.listFiles(given, null, true);
			for each (var file in files) {
				var executable = file.canExecute();
				if (!executable) {
					file.setExecutable(true, true);
					executable = file.canExecute();
					print("Executable '" + file + "' ? " + (executable ? "yes" : "no"));
				}
			}
		};
		return {
			exec : function(work, args, env) {
				for (var i = 0; i < args.length; i++) {
					var path = args[i];
					chmod(work, new File(path));
				}
			}
		}
	}
});