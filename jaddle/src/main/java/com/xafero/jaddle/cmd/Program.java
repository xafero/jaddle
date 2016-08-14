package com.xafero.jaddle.cmd;

import com.xafero.jaddle.interop.Context;
import com.xafero.jaddle.interop.Database;
import com.xafero.jaddle.interop.JSystem;

import java.io.File;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.script.Bindings;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class Program {

    public static void main(String[] args) throws IOException, ScriptException {
        // Load engine 
        ScriptEngineManager mgr = new ScriptEngineManager();
        ScriptEngine engine = mgr.getEngineByExtension("js");
        // Define parameters
        Class<?> clazz = Program.class;
        ClassLoader loader = clazz.getClassLoader();
        File cwd = (new File("")).getAbsoluteFile();
        // Inject them
        Bindings bnd = engine.createBindings();
        Map<Object, Object> env = new LinkedHashMap<>(System.getProperties());
        env.putAll(System.getenv());
        Context ctx = new Context(clazz, loader, cwd, args, engine, bnd, env);
        bnd.put("ctx", ctx);
        // Set data storage
        String home = System.getProperty("user.home");
        File global = new File(home, "global.db");
        File local = new File(cwd, "local.db");
        Database db = new Database(global, local);
        bnd.put("db", db);
        // Set system
        bnd.put("sys", new JSystem());
        // Load booter
        ctx.require("app/core/boot.js");
    }
}
