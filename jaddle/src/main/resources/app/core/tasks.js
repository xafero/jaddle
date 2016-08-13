(function () {
    this.tasks = {};

    var imports = new JavaImporter(org.springframework.core.io.support, org.apache.commons.io,
    		                       java.io);

    with (imports) {
        var resolver = new PathMatchingResourcePatternResolver();
        var resources = resolver.getResources('classpath*:jaddle/tasks/**/*.js');

        for (var i = 0; i < resources.length; i++) {
            var resource = resources[i];
            var url = resource.getURL();
            var alias = FilenameUtils.getBaseName(url);
            tasks[alias] = url;
        }
        
        var updateOnWork = function (work) {
	        var localTaskDir = new File(work, 'jaddle/tasks');
	        if (localTaskDir.exists()) {
		        var localTaskFiles = FileUtils.listFiles(localTaskDir, ['js'], true);
		        for (var i = 0; i < localTaskFiles.size(); i++) {
		        	var resource = localTaskFiles.get(i);
		        	var url = resource.toURI().toURL();
		        	var alias = FilenameUtils.getBaseName(url);
		        	tasks[alias] = url;
		        }
	        }
        };
        
        return {
            listTasks: function (work) {
            	updateOnWork(work);
                for (var task in tasks)
                    print(' * ' + task);
            },
            runTasks: function (work, ids, args, env) {
            	updateOnWork(work);
                for (var i = 0; i < ids.length; i++) {
                    var id = ids[i];
                    var src = tasks[id];
                    var task = ctx.require(src)();
                    task.exec(work, args, env);
                }
            }
        };
    }
});