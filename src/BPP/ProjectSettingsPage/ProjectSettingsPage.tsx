import {IProjectSettings, IServerSettings} from "../Interfaces";
import {Plugin} from "../Main";
import * as ReactDOM from "react-dom";
import React from "react";
import {ProjectSettingsPageComponent} from "./ProjectSettingsPageComponent";

/* project Setting page closure*/
export class ProjectSettingsPage extends matrixApi.ConfigPage
    implements matrixApi.IPluginSettingPage<IProjectSettings> {

    settingsOriginal: IProjectSettings;
    settingsChanged: IProjectSettings;

    getSettingsDOM(settings: IProjectSettings): JQuery {

        let container = document.createElement("div");
        container.classList.add("panel-body-v-scroll");
        container.classList.add("fillHeight");
        ReactDOM.render(<ProjectSettingsPageComponent
            projectSettings={ settings}
            settingsChanged={(settings)=>{ this.settingsChangedHandler(settings)  } }
        />, container);
        return $(container);
    }


    settingsChangedHandler(settings: IProjectSettings) {
        this.settingsChanged = settings;
        this.paramChanged();
    }
    settings(): IProjectSettings {
        let currentSettings = {};
        if (this.configApp != undefined && this.configApp.getJSONProjectSettings != undefined) {
            let filterSettings = this.configApp.getJSONProjectSettings(this.getProject(), Plugin.config.projectSettingsPage.settingName);
            if (filterSettings.length == 1)
                currentSettings = filterSettings[0].value;
        } else {
            currentSettings = matrixApi.globalMatrix.ItemConfig.getSettingJSON(Plugin.config.projectSettingsPage.settingName, {});
        }
        console.log("Returning project settings");
        return {...Plugin.config.projectSettingsPage.defaultSettings, ...currentSettings}
    }

    renderSettingPage() {
        this.initPage(
            `${Plugin.config.projectSettingsPage.title}`,
            true,
            undefined,
            Plugin.config.projectSettingsPage.help,
            Plugin.config.projectSettingsPage.helpUrl,
            undefined
        );
        this.showSimple();
    }

    saveAsync() {
        let def = this.configApp.setProjectSettingAsync(this.getProject(), Plugin.config.projectSettingsPage.settingName, JSON.stringify(this.settingsChanged), this.configApp.getCurrentItemId());
        def.done(() => {
            this.settingsOriginal = {...this.settingsChanged};
            this.renderSettingPage();
        })
        return def;
    }

    getProject() {
        /* get the project id from the setting page */
        return this.configApp.getCurrentItemId().split("-")[0];
    }

    showAdvanced() {
        console.debug("Show advanced clicked");
        this.showAdvancedCode(JSON.stringify(this.settingsChanged), function (newCode: string) {
            this.settingsChanged = JSON.parse(newCode);
            this.paramChanged();

        });
    }

    showSimple() {

        this.settingsOriginal = this.settings();
        this.settingsChanged = {...this.settingsOriginal};
        let dom = this.getSettingsDOM(this.settingsChanged);
        matrixApi.ml.UI.addTextInput($("#controls", dom), "My Project setting", this.settingsChanged, "myProjectSetting", this.paramChanged);
        matrixApi.app.itemForm.append(dom);
    }

    paramChanged() {
        this.configApp.itemChanged(JSON.stringify(this.settingsOriginal) != JSON.stringify(this.settingsChanged));
    }
}
