package com.apiflows.model;

import java.util.Map;

public class OutputsView {

    private Map<String, String> outputs;

    public OutputsView() {
    }

    public OutputsView(Map<String, String> outputs) {
        this.outputs = outputs;
    }

    public Map<String, String> getOutputs() {
        return outputs;
    }

    public void setOutputs(Map<String, String> outputs) {
        this.outputs = outputs;
    }

    public int getNumProperties() {
        return this.outputs != null ? this.outputs.size() : 0;
    }

}
