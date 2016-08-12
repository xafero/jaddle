package com.xafero.jaddle.interop;

import com.xafero.bodega.*;

public class Database {

    private final RetentionMap<?, ?> global;
    private final RetentionMap<?, ?> local;

    public Database() {
        this.global = new RetentionMap<>();
        this.local = new RetentionMap<>();
    }

    public RetentionMap<?, ?> getGlobal() {
        return global;
    }

    public RetentionMap<?, ?> getLocal() {
        return local;
    }
}
