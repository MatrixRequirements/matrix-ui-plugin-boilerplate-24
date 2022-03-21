/* Setting interfaces */
// eslint-disable-next-line no-unused-vars
namespace BoilerPlate {
    export interface IPluginBoilerPlateProjectSettings {
        projectSettingsTitle: string;
    }

    export interface IPluginBoilerPlateCustomerSettings {
        customerSettingsTitle: string;
    }
    export interface IPluginBoilerPlateFieldParameter extends IFieldParameter {
        fieldParameter: string;
    }
    export interface IPluginSettingPage  extends IAnyMap{
        renderSettingPage?: () => void,
     }
    export type IPluginBoilerPlateControlOptions = IBaseControlOptions
}
