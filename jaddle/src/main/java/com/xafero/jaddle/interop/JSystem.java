package com.xafero.jaddle.interop;

import java.lang.reflect.Field;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.lang3.SystemUtils;
import org.apache.commons.lang3.reflect.FieldUtils;

public class JSystem {

	private final List<String> os;

	public JSystem() {
		this.os = detectOS();
	}

	public List<String> getOS() {
		return os;
	}

	public static List<String> detectOS() {
		try {
			List<String> oss = new LinkedList<>();
			Class<?> cl = SystemUtils.class;
			Object arch = FieldUtils.readStaticField(cl, "OS_ARCH");
			String prefix = "IS_OS_";
			for (Field field : FieldUtils.getAllFields(cl)) {
				if (!field.getName().startsWith(prefix))
					continue;
				boolean value = (boolean) FieldUtils.readStaticField(field);
				if (!value)
					continue;
				String simple = field.getName().replace(prefix, "");
				oss.add((simple + "_" + arch).toLowerCase());
				oss.add(simple.toLowerCase());
			}
			return oss;
		} catch (IllegalAccessException e) {
			throw new RuntimeException(e);
		}
	}
}