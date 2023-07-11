import {IServerSettings} from "../Interfaces";
import {Plugin} from "../Main";
import * as ReactDOM from "react-dom";
import React from "react";
import { ServerSettingsPageComponent } from "./ServerSettingPageComponent";

// eslint-disable-next-line no-unused-vars
/* server Setting page closure*/
export class ServerSettingsPage extends matrixApi.ConfigPage implements matrixApi.IPluginSettingPage<IServerSettings> {
    settingsOriginal?: IServerSettings;
    settingsChanged?: IServerSettings;

    settings(): IServerSettings {
        return {
            ...Plugin.config.customerSettingsPage.defaultSettings,
            ...matrixApi.PluginCore.getServerSetting(Plugin.config.customerSettingsPage.settingName, {}),
        };
    }
    /** Customize this method to generate static HTML.  */
    getSettingsDOM(settings: IServerSettings): JQuery {
        let container = document.createElement("div");
        container.classList.add("panel-body-v-scroll");
        container.classList.add("fillHeight");
        ReactDOM.render(<ServerSettingsPageComponent
            serverSettings={ settings}
            settingsChanged={(settings)=>{ this.settingsChangedHandler(settings)  } }
        />, container);
        return $(container);
    }
    /** Customize this method to add dynamic content*/
    showSimple() {
        this.settingsOriginal = {...this.settings()};
        this.settingsChanged = {...this.settingsOriginal};
        let dom = this.getSettingsDOM(this.settingsChanged);
        matrixApi.app.itemForm.append(dom);
    }
    settingsChangedHandler(settings: IServerSettings) {
        this.settingsChanged = settings;
        this.paramChanged();
    }
    renderSettingPage() {
        this.initPage(
            `${Plugin.config.customerSettingsPage.title} - Server settings`,
            true,
            undefined,
            Plugin.config.customerSettingsPage.help,
            Plugin.config.customerSettingsPage.helpUrl,
            undefined
        );
        this.showSimple();
    }
    showAdvanced() {
        console.debug("Show advanced clicked");
        this.showAdvancedCode(JSON.stringify(this.settingsChanged), function (newCode: string) {
            this.settingsChanged = JSON.parse(newCode);
            this.paramChanged();
        });
    }
    saveAsync() {
        let def = this.configApp.setServerSettingAsync(Plugin.config.customerSettingsPage.settingName, JSON.stringify(this.settingsChanged));
        def.done(() => {
            this.settingsOriginal = {...this.settingsChanged};
            this.renderSettingPage();
        })
        return def;
    }

    paramChanged() {
        this.configApp.itemChanged(JSON.stringify(this.settingsOriginal) != JSON.stringify(this.settingsChanged));
    }
}
