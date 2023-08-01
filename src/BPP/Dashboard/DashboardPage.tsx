// @flow
// import {IProjectSettings} from "./Interfaces";
import {Plugin} from "../Main";

import * as React from "react"
import * as ReactDOM from "react-dom"
import {DashboardPageContainer} from "./Components/DashboardPageContainer";
import {DashboardProps, DashboardState, IDashboard, IDashboardContent, IProjectSettings} from "../Interfaces";
import IDashboardParametersBase = matrixApi.IDashboardParametersBase;

export interface IDashboardParameters extends  IDashboardParametersBase{

}

export class Dashboard extends React.Component<IDashboardContent, DashboardState> {
    render() {
        return (
            <div className="itemDetails">
            </div>
        );
    }
}

// Glue code to support the IDashboardPage interface
// eslint-disable-next-line no-unused-vars
export class DashboardPage implements matrixApi.IDashboardPage<IDashboardParameters> {
    settings: IProjectSettings;

    constructor(private project: matrixApi.Project, private projectStorage: matrixApi.IDataStorage, private popupModeOrControl = false, private currentFolder: matrixApi.IItem = undefined) {
        this.settings = {
            ...Plugin.config.projectSettingsPage.defaultSettings,
            ...project.getItemConfig().getSettingJSON(Plugin.config.projectSettingsPage.settingName, {})
        };
    }

    /** Add interactive element in this function */
    renderProjectPage() {
        const element = document.createElement("div");
        let dashboard: IDashboard = {
            header: {title: "Dashboard", showFullScreen: false},
            dashboardContent: {settings: this.settings}
        };
        ReactDOM.render(<DashboardPageContainer dashboard={dashboard}/>, element)
        matrixApi.app.itemForm.append(element);
    }

    onResize() {
        /* Will be triggered when resizing. */
    }

}