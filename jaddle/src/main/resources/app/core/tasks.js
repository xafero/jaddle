(function () {
    this.tasks = {};

    var imports = new JavaImporter(org.springframework.core.io.support, org.apache.commons.io);

    with (imports) {
        var resolver = new PathMatchingResourcePatternResolver();
        var resources = resolver.getResources("classpath*:jaddle/tasks/**/*.js");

        for (var i = 0; i < resources.length; i++) {
            var resource = resources[i];
            var url = resource.getURL();
            var alias = FilenameUtils.getBaseName(url);
            tasks[alias] = url;
        }

        return {
            listTasks: function () {
                for (var task in tasks)
                    print(" * " + task);
            },
            runTasks: function (ids) {
                for (var i = 0; i < ids.length; i++) {
                    var id = ids[i];
                    var src = tasks[id];
                    var task = ctx.require(src)();
                    task.exec();
                }
            }
        };
    }
});