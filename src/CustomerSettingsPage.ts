// eslint-disable-next-line no-unused-vars
namespace BoilerPlate {
    /* Customer Setting page closure*/
    export function PluginBoilerPlateCustomerSettingsPage( settings: IPluginBoilerPlateCustomerSettings ) {
        let self: IAnyMap = {
            settings: settings,
        };
        if (window["ConfigPage"] !== undefined) {
            self = new ConfigPage();
        }

        self.renderCustomerSettingPage = () => {
            self.settings = settings;
            self.initPage(
                settings.customerSettingsTitle,
                true,
                undefined,
                "My help",
                "https://mainHelp.com",
                undefined
            );
        };

        self.showAdvanced = () => {
            console.debug("Show advanced clicked");
        };
        self.showSimple = () => {
            app.itemForm.append(self.getCustomerSettingPageDOM(this.settings));
        };

        self.getCustomerSettingPageDOM = (settings: IPluginBoilerPlateCustomerSettings): JQuery => {
            return $(`
        <div class="panel-body-v-scroll fillHeight">
            This is my settings : ${settings.customerSettingsTitle}
        </div>
        `);
        };
    }
}
