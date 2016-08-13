(function() {
	var imports = new JavaImporter(java.io, java.util, java.lang, 
			com.xafero.jaddle.web, com.xafero.sfs.Hoster,
			java.util.concurrent, java.net, java.awt);

	with (imports) {
		var getAddresses = function() {
			var results = new LinkedHashSet();
			for each (var ni in Collections.list(NetworkInterface.getNetworkInterfaces())) 
				for each (var ia in Collections.list(ni.getInetAddresses())) {
					if (ia.isLoopbackAddress() || ia.isLinkLocalAddress())
						continue;
					results.add(ia);
				}
			return results;
		};
		// Set up container
		var hostedFiles = new LinkedHashMap();
		// Serve function
		var serve = function(root, key, val) {
			var file = new File(root, val);
			hostedFiles.put(key, file);
		};
		return {
			exec : function(work, args, env) {
				// Loop for all files
				for (var i = 0; i < args.length; i = i + 2) {
					var link = args[i];
					var target = args[i+1];
					serve(work, link, target);
				}
				// Start up server
				var port = 8080;
				var allNet = "0.0.0.0";
				var server = new ServePlugin(hostedFiles);
				var hoster = new Hoster(allNet, port, new File(""), server);
				var pool = Executors.newCachedThreadPool();
				pool.submit(hoster);
				// Open browser
				for each (var addr in getAddresses()) {
					var endpoint = (hoster.getEndpoint() + "").replace(allNet, addr.getHostAddress());
					var uri = URI.create(endpoint);
					print(" Endpoint = " + uri);
					Desktop.getDesktop().browse(uri);
				}
				// Wait for exit
				print("Press any key to quit...");
				System.in.read();
				pool.shutdown();
				System.exit(0);
				print("Done.");
			}
		}
	}
});