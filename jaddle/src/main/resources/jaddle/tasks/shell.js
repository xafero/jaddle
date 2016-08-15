(function () {
    var imports = new JavaImporter(java.lang, java.io,
            com.xafero.jaddle.io);

    with (imports) {
        return {
            exec: function (work, args, env) {
                var bld = new ProcessBuilder(args);
                bld.directory(work);
                bld.redirectErrorStream(true);
                bld.environment().putAll(env);
                var proc = bld.start();
                var pusher = new OutputPusher(proc.getOutputStream());
                pusher.pushln(env.get('STD_IN'), '#');
                var is = proc.getInputStream();
                var isr = new InputStreamReader(is);
                var br = new BufferedReader(isr);
                var line = null;
                while ((line = br.readLine()) != null)
                    print(line);
                var exitValue = proc.waitFor();
                print(exitValue);
                pusher.close();
            }
        }
    }
});