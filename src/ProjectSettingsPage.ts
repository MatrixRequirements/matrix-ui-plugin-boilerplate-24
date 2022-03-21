namespace BoilerPlate {
    export function ProjectSettingsPage() {
        
        let self: IAnyMap = {};
        if (window["ConfigPage"] !== undefined) {
            self = new ConfigPage();
        }

        self.renderProjectSettingPage = (settings: IPluginBoilerPlateProjectSettings) => {
            self.settings = settings;
            self.initPage(
                settings.projectSettingsTitle,
                true,
                undefined,
                "My help",
                "https://mainHelp.com",
                undefined
            );
            app.itemForm.append(self.getDashboardSettingsDOM(self.settings));
        };
        self.showAdvanced = () => {
            console.debug("Show advanced clicked");

        };
        self.showSimple = () => {
            app.itemForm.append(self.getDashboardSettingsDOM(this.settings));
        };
        self.getDashboardSettingsDOM = (settings: IPluginBoilerPlateProjectSettings): JQuery => {
            return $(`
                <div class="panel-body-v-scroll fillHeight">
                    This is my content : ${settings.projectSettingsTitle}
                </div>
                `);
        };
        return self;
    }
}
