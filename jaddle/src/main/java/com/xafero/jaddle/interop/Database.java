package com.xafero.jaddle.interop;

import com.xafero.bodega.*;
import java.io.File;

public class Database {

    private final RetentionMap<?, ?> global;
    private final RetentionMap<?, ?> local;

    public Database(File globalFile, File localFile) {
        this.global = new RetentionMap<>(globalFile);
        this.local = new RetentionMap<>(localFile);
    }

    public RetentionMap<?, ?> getGlobal() {
        return global;
    }

    public RetentionMap<?, ?> getLocal() {
        return local;
    }
}
