/**
 * This implements a field which can be added to a category to be displayed when editing an item.
 *
 * These fields can be printed in using the custom print sections.
 *
 */
import * as React from "react";
import {IControlProp} from "../Interfaces";

export class ControlComponent extends React.Component<IControlProp> {
    render() {
        return (
            <div>
                <span> <input value={this.props.value} onChange={this.handleChange}/> </span>
            </div>
        );
    }

    private handleChange() {
        this.props.valueChanged(this.props.value);
    }
}