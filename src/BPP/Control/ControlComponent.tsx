/**
 * This implements a field which can be added to a category to be displayed when editing an item.
 *
 * These fields can be printed in using the custom print sections.
 *
 */
import * as React from "react";
import {IControlProp} from "../Interfaces";


export const ControlComponent = (props: IControlProp) => {
    const [value, setValue] = React.useState(props.value);
    const handleChange = (val: string) => {
        setValue({value: val});
        props.valueChanged({value: val});
    }
    if (props.print) {
        return <div>{value?.value}</div>
    }
    return <>
        <div>
            <span> <input autoComplete="off" className="lineInput form-control" value={value?.value}
                          onChange={(event) => handleChange(event.target.value)}/> </span>
        </div>
    </>
}
