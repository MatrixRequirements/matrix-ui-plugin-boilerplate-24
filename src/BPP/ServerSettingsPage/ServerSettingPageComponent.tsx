import { useState } from "react";
import { IServerSettingsProp } from "../Interfaces";

export const ServerSettingsPageComponent = (props: IServerSettingsProp) => {
    const [state, setState] = useState(props.serverSettings);
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
                    <label>My Server Setting</label>
                    <input
                        autoComplete="off"
                        value={state.myServerSetting}
                        name="myServerSetting"
                        className="lineInput form-control"
                        onChange={handleChange}
                    />
                </span>
                <span>
                    <label>My Second Value</label>
                    <input
                        autoComplete="off"
                        value={state.mySecondValue}
                        name="mySecondValue"
                        className="lineInput form-control"
                        onChange={handleChange}
                    />
                </span>
            </div>
        </>
    );
};
