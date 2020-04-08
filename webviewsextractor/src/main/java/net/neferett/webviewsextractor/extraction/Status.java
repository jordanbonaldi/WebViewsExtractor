/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

package net.neferett.webviewsextractor.extraction;

import lombok.Data;

@Data
public class Status {

    private final String step;

    private String taskName;

    private int failedData;
    private int succeedData;
    private int remainingData;
    private int amountOfData;

    private boolean isFailed;
    private boolean isDone;

    /**
     *
     * Default constructor
     *
     * @param step Step string name
     */
    public Status(String step) {
        this.step = step;
    }

    /**
     *
     * @param step Step string name
     * @param failedData amount of failed data
     * @param succeedData amount of succeed data
     * @param remainingData amount of remaining data
     * @param isFailed is the step failed
     */
    public Status(String step, int failedData, int succeedData, int remainingData, boolean isFailed) {
        this(step);

        this.failedData = failedData;
        this.succeedData = succeedData;
        this.remainingData = remainingData;
        this.isFailed = isFailed;
    }

    /**
     *
     * @param status Old Object to merge with the current one
     */
    public void update(Status status) {
        this.failedData = status.failedData;
        this.succeedData = status.succeedData;
        this.remainingData = status.remainingData;
        this.amountOfData = status.amountOfData;
        this.taskName = status.taskName;
        this.isDone = status.isDone;
    }

    public void updateFailed() {
        if (this.isFailed) this.failedData++;
        else this.succeedData++;
    }

}
