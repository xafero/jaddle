(function() {
	var imports = new JavaImporter(java.lang, java.net);

	with (imports) {
		return {
			exec : function(work, args, env) {
				var hostname = InetAddress.getLocalHost().getHostName();
				var os = sys.OS;
				var osName = env.get('os.name');
				var ver = env.get('os.version');
				var spec = env.get('java.runtime.version');
				var time = env.get('user.timezone');
				var vm = env.get('java.vm.name');
				print(osName + " " + hostname + " " + ver + " " + spec + " "
						+ time + " " + vm + " " + os);
			}
		}
	}
});