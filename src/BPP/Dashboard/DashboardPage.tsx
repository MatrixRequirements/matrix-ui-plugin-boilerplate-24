import * as ReactDOM from "react-dom";

import { Plugin } from "../Plugin";
import { DashboardPageContainer } from "./Components/DashboardPageContainer";
import { IDashboard, IDashboardContent, IProjectSettings } from "../Interfaces";
import { Project, IDataStorage, IItem, IDashboardPage, IDashboardParametersBase } from "matrix-requirements-sdk/client";
import { sdkInstance } from "./../Instance";

export interface IDashboardParameters extends IDashboardParametersBase {}

export class DashboardPage implements IDashboardPage<IDashboardParameters> {
    private settings: IProjectSettings;

    constructor(
        private readonly project: Project,
        private readonly projectStorage: IDataStorage,
        private readonly popupModeOrControl: boolean = false,
        private readonly currentFolder?: IItem,
    ) {
        this.settings = this.initializeSettings();
    }

    private initializeSettings(): IProjectSettings {
        return {
            ...Plugin.config.projectSettingsPage.defaultSettings,
            ...this.project.getItemConfig().getSettingJSON(Plugin.config.projectSettingsPage.settingName, {}),
        };
    }

    renderProjectPage(): void {
        const dashboard: IDashboard = {
            header: { title: "Dashboard", showFullScreen: false },
            dashboardContent: { settings: this.settings },
        };

        const element = document.createElement("div");
        ReactDOM.render(<DashboardPageContainer dashboard={dashboard} />, element);
        sdkInstance.app.itemForm.append(element);
    }

    onResize(): void {
        // Resize handling logic goes here.
    }
}
