(function (args) {
    var imports = new JavaImporter(org.apache.commons.cli);

    with (imports) {
        // Define options
        var help = new Option('h', 'help', false, 'print the help information');
        var tasks = new Option('t', 'tasks', false, 'list available tasks');
        var runTask = new Option('r', 'run', true, 'execute selected task(s)');
        runTask.setArgs(Option.UNLIMITED_VALUES);

        // Collect options
        var options = new Options();
        options.addOption(help);
        options.addOption(tasks);
        options.addOption(runTask);

        // Get modules
        var taskMod = ctx.require('app/core/tasks.js')();

        // Parse it!
        var parser = new DefaultParser();
        try {
            var line = parser.parse(options, args);
            if (args.length < 1 || line.hasOption('h')) {
                var formatter = new HelpFormatter();
                formatter.printHelp('jaddle', options);
                return;
            }
            if (line.hasOption('t')) {
                taskMod.listTasks();
                return;
            }
            if (line.hasOption('r')) {
                var vals = line.getOptionValues('r');
                taskMod.runTasks(vals);
                return;
            }
        } catch (err) {
            err.printStackTrace();
        }
    }
});