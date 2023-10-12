import { IServerSettings } from "../Interfaces";
import { Plugin } from "../Plugin";
import * as ReactDOM from "react-dom";
import React from "react";
import { ServerSettingsPageComponent } from "./ServerSettingPageComponent";

// eslint-disable-next-line no-unused-vars
/* server Setting page closure*/
export class ServerSettingsPage extends matrixSdk.ConfigPage implements matrixSdk.IPluginSettingPage<IServerSettings> {
    settingsOriginal?: IServerSettings;
    settingsChanged?: IServerSettings;

    settings(): IServerSettings {
        return {
            ...Plugin.config.customerSettingsPage.defaultSettings,
            ...matrixSdk.PluginCore.getServerSetting(Plugin.config.customerSettingsPage.settingName, {}),
        };
    }
    /** Customize this method to generate static HTML.  */
    getSettingsDOM(settings: IServerSettings): JQuery {
        let container = document.createElement("div");
        container.classList.add("panel-body-v-scroll");
        container.classList.add("fillHeight");
        ReactDOM.render(
            <ServerSettingsPageComponent
                serverSettings={settings}
                settingsChanged={(settings) => {
                    this.settingsChangedHandler(settings);
                }}
            />,
            container,
        );
        return $(container);
    }
    /** Customize this method to add dynamic content*/
    showSimple() {
        $("#container", matrixSdk.app.itemForm).empty();
        let dom = this.getSettingsDOM(this.settingsChanged);
        $("#container", matrixSdk.app.itemForm).append(dom);
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
            undefined,
        );
        this.settingsOriginal = { ...this.settings() };
        this.settingsChanged = { ...this.settingsOriginal };
        matrixSdk.app.itemForm.append($("<div id='container'></div>"));
        this.showSimple();
    }
    showAdvanced() {
        console.debug("Show advanced clicked");
        this.showAdvancedCode(JSON.stringify(this.settingsChanged), (newCode: string) => {
            this.settingsChanged = JSON.parse(newCode);
            this.paramChanged();
            this.showSimple();
        });
    }
    saveAsync() {
        let def = this.configApp.setServerSettingAsync(
            Plugin.config.customerSettingsPage.settingName,
            JSON.stringify(this.settingsChanged),
        );
        def.done(() => {
            this.settingsOriginal = { ...this.settingsChanged };
            this.renderSettingPage();
        });
        return def;
    }

    paramChanged() {
        this.configApp.itemChanged(JSON.stringify(this.settingsOriginal) != JSON.stringify(this.settingsChanged));
    }
}
