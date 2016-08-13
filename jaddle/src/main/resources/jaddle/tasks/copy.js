(function() {
	var imports = new JavaImporter(java.io, org.apache.commons.io);

	with (imports) {
		var copy = function(work, src, dst) {
			print("Copying '" + src + "' to '" + dst + "'...");
			FileUtils.copyDirectory(src, dst);
		};
		return {
			exec : function(work, args, env) {
				for (var i = 0; i < args.length; i = i + 2) {
					var from = new File(args[i]);
					var to = new File(args[i + 1]);
					copy(work, from, to);
				}
			}
		}
	}
});