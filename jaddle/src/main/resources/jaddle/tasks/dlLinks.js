(function () {
    var imports = new JavaImporter(java.io, java.net, java.util, org.apache.commons.io);
    
    with (imports) {
    	var parseHtml = function(base) {    		
    		var urls = new TreeSet();    		
    		var url = URI.create(base);
    		var input = url.toURL().openStream();
    		var html = IOUtils.toString(input, 'UTF8');
    		var ptas = html.split('<a');
			for (var i = 0; i < ptas.length; i++) {
				var pt = ptas[i];
				var pt2 = pt.split('</a>')[0];
				var pts = pt2.split('>');
				var href = pts[0].replace('href=', '')
							.replaceAll('"', ' ').trim();
				if (href.startsWith('<!') || href.startsWith('?')
						|| href.startsWith('-') || href.startsWith('/'))
					continue;				
				var subUrl = URI.create(base + href);
				urls.add(subUrl);
    		}
			input.close();
    		return urls;
    	};
    	var download = function(work, urls) {
    		var files = new TreeSet();    		
    		for each (var url in urls) {
    			var file = new File(work, url.toURL().getFile());
    			if (file.exists() && file.canRead())
    				continue;
    			var input = url.toURL().openStream();
    			file.getParentFile().mkdirs();
    			var out = new FileOutputStream(file);
    			IOUtils.copy(input, out);
    			files.add(file);
    			out.flush();
    			out.close();
    			input.close();
    			print("Downloaded: " + file)
    		}
    		return files;
    	};
        return {
            exec: function (work, args) {
            	for (var i = 0; i < args.length; i++) {
					var url = args[i];
					download(work, parseHtml(url));
            	}
            }
        }
    }
});