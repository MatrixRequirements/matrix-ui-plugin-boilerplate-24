namespace BoilerPlate {
    export class DashboardPage {
        settings: IPluginBoilerPlateProjectSettings;

        constructor(settings: IPluginBoilerPlateProjectSettings) {
            this.settings = settings;
        }

        getDashboardDOM(settings: IPluginBoilerPlateProjectSettings): JQuery {
            return $(`
        <div class="panel-body-v-scroll fillHeight">
            This is my content : ${settings.projectSettingsTitle}
        </div>
        `);
        }

        renderProjectPage() {
            let that = this;

            let control = this.getDashboardDOM(this.settings);
            app.itemForm.append(
                ml.UI.getPageTitle(
                    this.settings.projectSettingsTitle,
                    () => {
                        return control;
                    },
                    () => {
                        that.onResize();
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
