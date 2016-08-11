(function () {
    return {
        exec: function (args) {
            for (var a in args)
                print(a);
        }
    };
});