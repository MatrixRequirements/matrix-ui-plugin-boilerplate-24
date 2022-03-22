// eslint-disable-next-line no-unused-vars
namespace BoilerPlate {
    /* server Setting page closure*/
    export function ServerSettingsPage( settings: IServerSettings ): IPluginSettingPage {
        let self: IPluginSettingPage = {};
        if (window["ConfigPage"] !== undefined) {
            self = { ...Object.getPrototypeOf(new ConfigPage()) };
        }
        self.settings = settings;
        self.renderSettingPage = () => {
            this.settings = settings;
            self.initPage(
                settings.title,
                true,
                undefined,
                "My help",
                "https://docs23.matrixreq.com",
                undefined
            );
            self.showSimple();
        };
        self.showAdvanced = () => {
            console.debug("Show advanced clicked");
        };
        self.showSimple = () => {
            app.itemForm.append(self.getSettingsDOM());
        };
        self.getSettingsDOM = (): JQuery => {
            return $(`
                <div class="panel-body-v-scroll fillHeight">
                    <div>
                        This is my customer settings page : ${self.settings.serverSettingsTitle}
                    </div>

                </div>
            `);
        };
        return self;
    }
}
