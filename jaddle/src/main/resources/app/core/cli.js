(function (args) {
    var imports = new JavaImporter(org.apache.commons.cli);

    with (imports) {
        // Define options
        var help = new Option("h", "help", false, "print the help information");

        // Collect options
        var options = new Options();
        options.addOption(help);

        // Parse it!
        var parser = new DefaultParser();
        try {
            var line = parser.parse(options, args);
            if (args.length < 1 || line.hasOption("h")) {
                var formatter = new HelpFormatter();
                formatter.printHelp("jaddle", options);
            }
        } catch (err) {
            java.lang.System.err.println(err.getMessage());
        }
    }
});