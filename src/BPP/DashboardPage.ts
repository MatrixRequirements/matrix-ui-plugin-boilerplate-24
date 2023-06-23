import {IProjectSettings} from "./Interfaces";
import {Plugin} from "./Main";

// eslint-disable-next-line no-unused-vars
export class DashboardPage implements matrixApi.IDashboardPage {
    settings: IProjectSettings;

    constructor(private project: matrixApi.Project, private projectStorage: matrixApi.IDataStorage, private popupModeOrControl = false, private currentFolder: matrixApi.IItem = undefined) {
        this.settings = {
            ...Plugin.config.projectSettingsPage.defaultSettings,
            ...project.getItemConfig().getSettingJSON(Plugin.config.projectSettingsPage.settingName, {})
        };
    }

    /** Add interactive element in this function */
    renderProjectPage() {

        const control = this.getDashboardDOM();
        matrixApi.app.itemForm.append(
            matrixApi.ml.UI.getPageTitle(
                Plugin.config.dashboard.title,
                () => {
                    return control;
                },
                () => {
                    this.onResize();
                }
            )
        );
        matrixApi.app.itemForm.append(control);
    }

    onResize() {
        /* Will be triggered when resizing. */
    }

    /** Customize static HTML here */
    private getDashboardDOM(): JQuery {
        return $(`
    <div class="panel-body-v-scroll fillHeight"> 
        <div class="panel-body">
            This is my content : ${this.settings.myProjectSetting}
        </div>
    </div>
    `);
    }
}
