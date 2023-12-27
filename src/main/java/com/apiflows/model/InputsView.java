package com.apiflows.model;

import io.swagger.v3.oas.models.media.Schema;

public class InputsView {

    private Schema schema;

    public InputsView() {
    }

    public InputsView(Schema schema) {
        this.schema = schema;
    }

    public Schema getSchema() {
        return schema;
    }

    public void setSchema(Schema schema) {
        this.schema = schema;
    }

    public int getNumProperties() {
        return this.schema.getProperties() != null ? schema.getProperties().size() : 0;
    }

}
