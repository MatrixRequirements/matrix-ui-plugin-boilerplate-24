// eslint-disable-next-line no-unused-vars
namespace BoilerPlate {
    export class DashboardPage {
        settings: IProjectSettings;

        constructor(settings: IProjectSettings) {
            this.settings = settings;
        }

        getDashboardDOM(settings: IProjectSettings): JQuery {
            return $(`
        <div class="panel-body-v-scroll fillHeight">
            <div class="panel-body">
                This is my content : ${settings.title}
            </div>
        </div>
        `);
        }

        renderProjectPage() {

            const control = this.getDashboardDOM(this.settings);
            app.itemForm.append(
                ml.UI.getPageTitle(
                    this.settings.title,
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
