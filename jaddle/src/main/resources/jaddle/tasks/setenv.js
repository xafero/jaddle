(function () {
    var imports = new JavaImporter(java.util);

    with (imports) {
        var setenv = function (env, name, value) {
            return env.put(name, value);
        };

        return {
            exec: function (work, args, env) {
                for (var i = 0; i < args.length; i = i + 2) {
                    var key = args[i];
                    var val = args[i + 1];
                    var old = setenv(env, key, val);
                    print(key + ' = ' + val + ' [' + old + ']');
                }
            }
        }
    }
});