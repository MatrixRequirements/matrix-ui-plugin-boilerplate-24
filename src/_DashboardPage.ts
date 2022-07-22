/**
 * This adds a dashboard to a project
 * 
 */

interface IPluginBoilerPlateFieldDashboardParams {
    dashboardId:string,
    parameters:IPluginBoilerPlateFieldDashboardParamsParameters,
}
interface IPluginBoilerPlateFieldDashboardParamsParameters {
    category:string
}

// eslint-disable-next-line no-unused-vars
namespace BoilerPlate {
    export class DashboardPage {
        settings: IProjectSettings;

        constructor() {
            this.settings = { ...Plugin.config.projectSettingsPage.defaultSettings, ...IC.getSettingJSON(Plugin.config.projectSettingsPage.settingName, {}) } ;
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

        getJsonConfig():IPluginBoilerPlateFieldDashboardParams {
            return {
                dashboardId:Plugin.config.dashboard.id,
                parameters:this.readParamsFromUI()   
            }
        }
        /** Add interactive element in this function */
        renderProjectPage() {
            let that = this;

            // render UI to fill params
            
            let xxx = $("<button>do it</button>").appendTo(app.itemForm);
            // add 
            xxx.on("click", () => {
                that.renderDashboard( that.readParamsFromUI() );
            });
        }

        readParamsFromUI():IPluginBoilerPlateFieldDashboardParamsParameters {
            return { category:"XXX"};
        }
        
        renderDashboard( params:IPluginBoilerPlateFieldDashboardParamsParameters) {
            const control = this.getDashboardDOM();
            app.itemForm.append(
                ml.UI.getPageTitle(
                    this.settings.myProjectSetting,
                    () => {
                        return control;
                    },
                    () => {
                        this.onResize();
                    }
                )
            );
            app.itemForm.append(control);
        }

        onResize() {
           /* Will be triggered when resizing. */
        }
    }
}
