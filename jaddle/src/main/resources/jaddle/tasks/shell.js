(function () {
    var imports = new JavaImporter(java.lang, java.io);

    with (imports) {
        return {
            exec: function (args) {
                var bld = new ProcessBuilder(args);
                bld.directory(ctx.workingDir);
                bld.redirectErrorStream(true);
                var env = bld.environment();
                var proc = bld.start();
                var is = proc.getInputStream();
                var isr = new InputStreamReader(is);
                var br = new BufferedReader(isr);
                var line = null;
                while ((line = br.readLine()) != null)
                    print(line);
                var exitValue = proc.waitFor();
                print(exitValue);
            }
        }
    }
});