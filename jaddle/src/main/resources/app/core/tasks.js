(function () {
    this.tasks = ['kack1', 'kack2'];
    return {
        listTasks: function () {
            for (var i = 0; i < tasks.length; i++)
                print(tasks[i]);
        },
        runTasks: function (ids) {
            for (var i = 0; i < ids.length; i++)
                print(ids[i]);
        }
    };
});