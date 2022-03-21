// eslint-disable-next-line no-unused-vars
namespace BoilerPlate {
    export class DashboardPage {
        settings: IPluginBoilerPlateProjectSettings;

        constructor(settings: IPluginBoilerPlateProjectSettings) {
            this.settings = settings;
        }

        getDashboardDOM(settings: IPluginBoilerPlateProjectSettings): JQuery {
            return $(`
        <div class="panel-body-v-scroll fillHeight">
            <div class="panel-body">
                This is my content : ${settings.projectSettingsTitle}
            </div>
        </div>
        `);
        }

        renderProjectPage() {

            const control = this.getDashboardDOM(this.settings);
            app.itemForm.append(
                ml.UI.getPageTitle(
                    this.settings.projectSettingsTitle,
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
            console.log("onresize has been triggered... ");
        }
    }
}
