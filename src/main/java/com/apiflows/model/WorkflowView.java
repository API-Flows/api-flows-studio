package com.apiflows.model;

import java.util.ArrayList;
import java.util.List;

public class WorkflowView {

    private String title;
    private String description;
    private String version;
    private InputsView inputsView;
    private OutputsView outputsView;
    private List<StepView> stepViews = new ArrayList<>();

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public InputsView getInputsView() {
        return inputsView;
    }

    public void setInputsView(InputsView inputsView) {
        this.inputsView = inputsView;
    }

    public OutputsView getOutputsView() {
        return outputsView;
    }

    public void setOutputsView(OutputsView outputsView) {
        this.outputsView = outputsView;
    }

    public List<StepView> getStepViews() {
        return stepViews;
    }

    public void setStepViews(List<StepView> stepViews) {
        this.stepViews = stepViews;
    }

    public void addStepView(StepView stepView) {
        this.stepViews.add(stepView);
    }
}
