/// <reference types="matrixrequirements-type-declarations" />
import {
    IConfigApp,
    IPluginFieldHandler,
    registerPlugin,
    buildPlugin,
} from "matrix-requirements-sdk/client";
import { sdkInstance } from "./Instance";
import { Control } from "./Control/Control";
import { DashboardPage, IDashboardParameters } from "./Dashboard/DashboardPage";
import { ProjectSettingsPage } from "./ProjectSettingsPage/ProjectSettingsPage";
import { ServerSettingsPage } from "./ServerSettingsPage/ServerSettingsPage";
import { Tool } from "./Tools/Tools";
import { IPluginFieldOptions, IPluginFieldValue, IProjectSettings, IServerSettings } from "./Interfaces";
import { FieldHandler } from "./Control/FieldHandler";

export const Plugin = buildPlugin<
    IServerSettings,
    IProjectSettings,
    IPluginFieldHandler<IPluginFieldValue>,
    IPluginFieldValue,
    IDashboardParameters,
    IPluginFieldOptions
>({
    name: "<PLUGIN_NAME_PLACEHOLDER>",
    version: "<PLUGIN_VERSION_PLACEHOLDER>",
    sdkInstance,
    /**
     * This method is called each time  a project has been loaded and initialized.
     * At the time it is called, all project settings, categories etc are defined.
     *
     * @param project // loaded project
     */
    onInitProject: (project) => {
        // here is a good place to decide based on the project (maybe some project setting), whether the plugin should be enabled

        // if not:
        // this.enabledInContext = false;
    },
    /** this method is called just before the rendering of an item is done
     * It is also called when opening the create item dialog.
     *
     * @param _item: the item which is being loaded in the UI
     */
    onInitItem: (item) => {
        // here is a good place to decide based on the selection in the tree, whether the plugin should be enabled
        // if not:
        // this.enabledInContext = false;
    },
    /*  Page in admin client to configure settings across all projects - remove if not needed.
        The page itself is implemented in the _ServerSettingsPage.ts
    */
    serverSettings: {
        config: {
            id: "BPPCustomerSettings",
            title: "BPP customer settings page",
            type: "BPPcs",
            enabled: true,
            defaultSettings: {
                myServerSetting: "default value for setting defined in Interfaces.ts",
                mySecondValue: "second value for setting defined in Interfaces.ts",
            },
            settingName: "BPP_settings",
            help: "This is my help text",
            helpUrl: "https://docs23.matrixreq.com",
        },
        getServerSettingsPageAsync: async () => {
            if (sdkInstance.app.isConfigApp()) {
                return new ServerSettingsPage(<IConfigApp>(<unknown>sdkInstance.app));
            }
            return null;
        },
    },
    /*  Page in admin client to configure settings for one specific project - remove if not needed.
        The page itself is implemented in the _ProjectSetingsPage.ts
    */
    projectSettings: {
        config: {
            id: "BPPprojectsettings",
            title: "BPP projectsettings page",
            type: "BPPps",
            enabled: true,
            defaultSettings: {
                myProjectSetting: "default value for setting defined in Interfaces.ts",
            },
            settingName: "BPP_settings",
            help: "This is my help text",
            helpUrl: "https://docs23.matrixreq.com",
        },
        getProjectSettingsPageAsync: async (project) => {
            if (sdkInstance.app.isConfigApp()) {
                return new ProjectSettingsPage(<IConfigApp>(<unknown>sdkInstance.app));
            }
            return null;
        },
    },
    /*  Add an entry in the tool menu of an item or folder - remove if not needed.
        The tool itself is implemented in the _Tool.ts
    */
    menu: {
        config: {
            enabled: true,
            title: "matrix-ui-plugin-boilerplate-menuitem",
        },
        getToolAsync: (project) => {
            return Promise.resolve(new Tool());
        },
        enableToolMenu: (core) => {
            return core.enabledInContext;
        },
    },
    /*  Add a custom field to enter some data in the UI - remove if not needed.
        The field itself is implemented in the _Control.ts
    */
    control: {
        config: {
            enabled: true,
            fieldType: "matrix-ui-plugin-boilerplate",
            title: "matrix-ui-plugin-boilerplate-field",
            fieldConfigOptions: {
                id: "matrix-ui-plugin-boilerplate",
                capabilities: {
                    canBePublished: false,
                    canBeReadonly: true,
                    canBeXtcPreset: false,
                    canHideInDoc: false,
                    canBeUsedInDocs: false,
                    canRequireContent: true,
                },
                class: "",
                help: "",
                label: "matrix-ui-plugin-boilerplate-field",
            },
        },
        getControlAsync: async (project, config, ctrlObj) => {
            return new Control(config, new FieldHandler(config.field.fieldType, config), ctrlObj);
        },
    },
    /*  Add a dashboard inside a project - remove if not needed.
        The field itself is implemented in the _Control.ts
    */
    dashboard: {
        config: {
            id: "BPP",
            title: "BPP dashboard page",
            enabled: true,
            icon: "fal fa-cog",
            parent: "DASHBOARDS",
            usefilter: true,
            order: 9999,
        },
        getDashboardAsync: async (project) => {
            return new DashboardPage(project, sdkInstance.globalMatrix.projectStorage);
        },
    },
});

registerPlugin(new Plugin().core);
