package net.neferett.webviewsextractor;

import androidx.test.filters.LargeTest;
import androidx.test.ext.junit.runners.AndroidJUnit4;

import androidx.test.rule.ActivityTestRule;
import org.junit.*;
import org.junit.runner.RunWith;

import static org.junit.Assert.*;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class TestAllExtractions {
    @Rule
    public ActivityTestRule<TestConnectionActivity> activityRule = new ActivityTestRule<>(TestConnectionActivity.class);

    @Before
    public void initActivity() {
        activityRule.getActivity();
    }

    @Test
    public void useAppContext() throws InterruptedException {
        Thread.sleep(600000);
    }

}
