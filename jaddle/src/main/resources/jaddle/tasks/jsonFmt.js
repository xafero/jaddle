(function() {
	var imports = new JavaImporter(java.io, com.google.gson);

	with (imports) {
		return {
			exec: function(work, args) {
				for (var i = 0; i < args.length; i++) {
					var folder = new File(args[i]);
					var parser = new JsonParser();
					var json = (new GsonBuilder()).setPrettyPrinting().create();
					var files = folder.listFiles();
					for (var j = 0; j < files.length; j++) {
						var file = files[j];						
						var input = file;
						var output = file;
						var reader = new FileReader(input);
						var tree = parser.parse(reader);
						var writer = new FileWriter(output);
						json.toJson(tree, writer);
						writer.flush();
						writer.close();
						reader.close();
						print('Reformatted: ' + file)
					}
				}
			}
		}
	}
});