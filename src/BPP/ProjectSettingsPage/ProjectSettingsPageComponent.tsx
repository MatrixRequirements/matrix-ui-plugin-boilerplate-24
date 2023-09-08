import { IProjectSettingsProp, IServerSettingsProp } from "../Interfaces";
import * as React from "react";

export const ProjectSettingsPageComponent = (props: IProjectSettingsProp) => {
    const [state, setState] = React.useState(props.projectSettings);
    function handleChange(evt) {
        let settings = {
            ...state,
            [evt.target.name]: evt.target.value,
        };
        setState(settings);
        if (props.settingsChanged) {
            props.settingsChanged(settings);
        }
    }

    return (
        <>
            <div>
                <span>
                    <label>My Project Setting</label>
                    <input
                        autoComplete="off"
                        value={state.myProjectSetting}
                        name="myProjectSetting"
                        className="lineInput form-control"
                        onChange={handleChange}
                    />
                </span>
            </div>
        </>
    );
};
