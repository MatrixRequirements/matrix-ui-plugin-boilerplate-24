import { Plugin } from "../Plugin";

import * as ReactDOM from "react-dom";
import { DashboardPageContainer } from "./Components/DashboardPageContainer";
import { IDashboard, IDashboardContent, IProjectSettings } from "../Interfaces";
import { Project, IDataStorage, IItem, IDashboardPage, IDashboardParametersBase } from "matrix-requirements-sdk/client";
import { sdkInstance } from "../Instance";

export interface IDashboardParameters extends IDashboardParametersBase {}

type DashboardProps = {
    settings: IProjectSettings;
};

export const Dashboard = (props: DashboardProps) => (
    <div className="w-auto p-4">Hello from the Matrix dashboard plugin!</div>
);

// Glue code to support the IDashboardPage interface
// eslint-disable-next-line no-unused-vars
export class DashboardPage implements IDashboardPage<IDashboardParameters> {
    settings: IProjectSettings;

    constructor(
        private project: Project,
        private projectStorage: IDataStorage,
        private popupModeOrControl = false,
        private currentFolder: IItem = undefined,
    ) {
        this.settings = {
            ...Plugin.config.projectSettingsPage.defaultSettings,
            ...project.getItemConfig().getSettingJSON(Plugin.config.projectSettingsPage.settingName, {}),
        };
    }

    /** Add interactive element in this function */
    renderProjectPage() {
        const element = document.createElement("div");
        element.classList.add("addon");
        element.style.overflow = "hidden";
        let dashboard: IDashboard = {
            header: { title: "Dashboard", showFullScreen: false },
            dashboardContent: { settings: this.settings },
        };
        ReactDOM.render(<DashboardPageContainer dashboard={dashboard} />, element);
        sdkInstance.app.itemForm.append(element);
    }

    onResize() {
        console.log({ resize: "resizing the plugin page" });
    }
}
