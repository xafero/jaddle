(function () {
    var imports = new JavaImporter(java.io, java.net, org.apache.commons.io);

    with (imports) {
		var download = function (work, url) {
			var file = new File(work, url.toURL().getFile());
			if (file.exists() && file.canRead())
				return file;
			var input = url.toURL().openStream();
			file.getParentFile().mkdirs();
			var out = new FileOutputStream(file);
			IOUtils.copy(input, out);
			out.flush();
			out.close();
			input.close();
			print("Downloaded: " + file)
			return file;
		};
        return {
            exec: function (work, args, env) {
            	var res = [];
				for (var i = 0; i < args.length; i++) {
					var url = args[i];
					var file = download(work, URI.create(url));
					res.push(file);
				}
				return res;
            }
        }
    }
});