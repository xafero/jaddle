package com.xafero.jaddle.cmd;

import com.xafero.jaddle.interop.Context;
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
        Map<?, ?> env = new LinkedHashMap<>(System.getProperties());
        Context ctx = new Context(clazz, loader, cwd, args, engine, bnd, env);
        bnd.put("ctx", ctx);
        // Load booter
        ctx.require("app/core/boot.js");
    }
}
