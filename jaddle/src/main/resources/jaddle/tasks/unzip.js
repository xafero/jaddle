(function() {
	var imports = new JavaImporter(java.io,
			org.apache.commons.compress.archivers,
			org.apache.commons.compress.archivers.tar,
			org.apache.commons.compress.archivers.zip,
			org.apache.commons.compress.compressors.gzip,
			org.apache.commons.compress.compressors.xz,
			org.apache.commons.compress.utils);

	with (imports) {
		var determine = function(file) {
			var name = file.getName().toLowerCase();
			var kind = null;
			if (name.endsWith(".zip"))
				kind = "ZIP";
			else if (name.endsWith(".tgz") || name.endsWith(".tar.gz"))
				kind = "TGZ";
			else if (name.endsWith(".txz") || name.endsWith(".tar.xz"))
				kind = "TXZ";
			return kind;
		};
		var detectArk = function(kind, input) {
			if (kind.startsWith("T"))
				return new TarArchiveInputStream(input);
			else
				return new ZipArchiveInputStream(input);
		};
		var detect = function(kind, input) {
			if (kind.equals("TXZ"))
				return new XZCompressorInputStream(input);
			else if (kind.equals("TGZ"))
				return new GzipCompressorInputStream(input);
			else
				return input;
		};
		var unpack = function(root, file, overwrite) {
			var list = [];
			var kind = determine(file);
			var input = new FileInputStream(file);
			var pack = detect(kind, input);
			var ark = detectArk(kind, pack);
			var i = 0;
			var entry;
			while ((entry = ark.getNextEntry()) != null) {
				var name = new File(root, entry.getName());
				list.push(name);
				i++;
				if (name.exists() && name.canRead()) {
					if (i == 1 && !overwrite) {
						print(" Skipped extraction, '" + name.getName()
								+ "' exists!");
						return list;
					}
					continue;
				}
				if (entry.isDirectory()) {
					name.mkdir();
					continue;
				}
				var out = new FileOutputStream(name);
				IOUtils.copy(ark, out);
				print("Extracted: " + name);
				out.flush();
				out.close();
			}
			ark.close();
			pack.close();
			input.close();
			return list;
		};
		return {
			exec : function(work, args, env) {
				var res = [];
				for (var i = 0; i < args.length; i++) {
					var path = args[i];
					var files = unpack(work, new File(path), false);
					res.push(files);
				}
				return res;
			}
		}
	}
});