package com.xafero.jaddle.interop;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import javax.script.Bindings;
import javax.script.ScriptEngine;
import javax.script.ScriptException;
import java.net.URL;
import java.util.Map;

public class Context {

    private final Class<?> clazz;
    private final ClassLoader loader;
    private final File workingDir;
    private final String[] args;
    private final ScriptEngine engine;
    private final Bindings context;
    private final Map<?, ?> env;
    
    public Context(Class<?> clazz, ClassLoader loader, File cwd,
            String[] args, ScriptEngine engine, Bindings ctx, 
            Map<?, ?> env) {
        this.clazz = clazz;
        this.loader = loader;
        this.workingDir = cwd;
        this.args = args;
        this.engine = engine;
        this.context = ctx;
        this.env = env;
    }

    public String[] getArgs() {
        return args;
    }

    public Class<?> getClazz() {
        return clazz;
    }

    public ClassLoader getLoader() {
        return loader;
    }

    public File getWorkingDir() {
        return workingDir;
    }

    public Bindings getContext() {
        return context;
    }

    public ScriptEngine getEngine() {
        return engine;
    }

    public Map<?, ?> getEnv() {
        return env;
    }
    
    public Object require(String path) throws IOException, ScriptException {
        try (InputStream in = loader.getResourceAsStream(path)) {
            if (in == null) {
                throw new FileNotFoundException(path);
            }
            return require(in);
        }
    }

    public Object require(URL url) throws IOException, ScriptException {
        try (InputStream in = url.openStream()) {
            return require(in);
        }
    }

    public Object require(InputStream in) throws IOException, ScriptException {
        try (InputStreamReader reader = new InputStreamReader(in, "UTF8")) {
            return engine.eval(reader, context);
        }
    }
}
