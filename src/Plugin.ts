/// <reference path="api/Matrix.Labels.ts" />

// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins
namespace BoilerPlate {
    export class Plugin implements IPlugin {
        public isDefault = true;
        currentFolder: IItem;
        popupModeOrControl: boolean;
        public static fieldType = "plugin_boiler_plate";

        static settingName: string = "plugin_boiler_plater_settings";

        static defaultSettingsProjectSettings: IPluginBoilerPlateProjectSettings = {
            projectSettingsTitle: "plugin Boiler plate project settings",
        };

        static defaultCustomerSettingsProjectSettings: IPluginBoilerPlateCustomerSettings = {
            customerSettingsTitle: "plugin Boiler plate customer settings",
        };

        constructor() {}

        initItem(_item: IItem, _jui: JQuery) {
            if (_item.id.indexOf("F-") == 0) {
                this.currentFolder = _item;
                this.popupModeOrControl = true;
            } else {
                this.currentFolder = undefined;
                this.popupModeOrControl = false;
            }
        }
        static canBeDisplay(cat: string): boolean {
            return true;
        }

        initServerSettings(serverSettings: XRGetProject_StartupInfo_ListProjectAndSettings) {}

        updateMenu(ul: JQuery, hook: number) {
            let li = $(`<li>PluginBoilerPlate </li>`).click(() => {
                alert("Plugin boiler plate");
            });

            ul.append(li);
        }
        supportsControl(fieldType: string): boolean {
            return fieldType == Plugin.fieldType;
        }
        createControl(ctrlObj: JQuery, settings: IBaseControlOptions) {
            if (settings && settings.fieldType == Plugin.fieldType) {
                let baseControl = new Control(ctrlObj);
                ctrlObj.getController = () => { return baseControl; }
                baseControl.init(settings);
            }
        }
        initProject() {}
        isEnabled() {
            return true;
        }
        getPluginName() {
            return Plugin.settingName;
        }

        getPluginVersion() {
            return "%BUILD_PLUGIN_VERSION%";
        }
        getProjectSettingPages(): ISettingPage[] {
            var pages: ISettingPage[] = [];

            return [
                {
                    id: "BPP_customerSettings",
                    title: "Boiler plate plugin project settings page",
                    render: (ui: JQuery) => {
                        let pbpi = ProjectSettingsPage();
                        pbpi.renderProjectSettingPage({
                            projectSettingsTitle: "BPP project settings page",
                        });
                    },
                },
            ];
        }
        getCustomerSettingPages(): ISettingPage[] {
            let that = this;

            return [
                {
                    id: "BPP_ProjectSettings",
                    title: "Boiler plate plugin customer settings page",
                    render: (ui: JQuery) => {
                        let pbpi = new PluginBoilerPlateCustomerSettingsPage({
                            customerSettingsTitle: "BBP CustomerSettings Page!",
                        });
                        pbpi.renderCustomerSettingPage();
                    },
                },
            ];
        }

        getProjectPages(): IProjectPageParam[] {
            let that = this;
            var pages: IProjectPageParam[] = [];
            let mergedSettings = Plugin.defaultSettingsProjectSettings;

            pages.push({
                id: "BOILERPLATE",
                title: "Boiler plater plugins",
                folder: "DASHBOARDS",
                order: 7000,
                icon: "fa fa-cog",
                usesFilters: true,
                render: (options: IPluginPanelOptions) => {
                    let gd = new DashboardPage(mergedSettings);
                    gd.renderProjectPage();
                },
            });
            return pages;
        }
    }
}

// Register the plugin
$(function () {
    plugins.register(new BoilerPlate.Plugin());
});

