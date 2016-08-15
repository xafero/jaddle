package com.xafero.jaddle.io;

import java.io.Closeable;
import java.io.IOException;
import java.io.OutputStream;

public class OutputPusher implements Closeable {

    private final OutputStream out;

    public OutputPusher(OutputStream out) {
        this.out = out;
    }

    public void pushln(String text) throws IOException {
        String line = String.format("%s%n", text);
        byte[] bytes = line.getBytes();
        out.write(bytes);
        out.flush();
    }

    public void pushln(String text, String sep) throws IOException {
        if (text == null) {
            return;
        }
        for (String txt : text.split(sep)) {
            pushln(txt);
        }
    }

    @Override
    public void close() throws IOException {
        out.flush();
        out.close();
    }
}
