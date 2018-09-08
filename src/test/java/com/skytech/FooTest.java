package com.skytech;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.assertEquals;

/**
 * Unit test for Foo class.
 */
@RunWith(JUnit4.class)
public class FooTest {
    private Foo foo;

    @Before
    public void init() {
        foo = new Foo();
    }

    @Test
    public void thisIsAssert() {
        assertEquals(foo.foo(), "foo");
    }
}
