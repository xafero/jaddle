(function () {
    var imports = new JavaImporter(java.util);

    with (imports) {
        var getenv = function (env, varname) {
            return env.get(varname);
        };

        return {
            exec: function (work, args, env) {
                for (var i = 0; i < args.length; i++) {
                    var arg = args[i];
                    var res = getenv(env, arg);
                    print(arg + ' = ' + res);
                }
            }
        }
    }
});