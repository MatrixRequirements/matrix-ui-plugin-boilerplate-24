/* Setting interfaces */
// eslint-disable-next-line no-unused-vars
namespace BoilerPlate {
    export interface IProjectSettings {
        /** Setting page placeholder */
        title: string;
    }

    export interface IServerSettings {
        /** Server Setting placeholder */
        title: string;
    }
    export interface IPluginBoilerPlateFieldParameter extends IFieldParameter {
        /** field parameter placeholder*/
        fieldParameter: string;
    }
    export interface IPluginSettingPage {
        renderSettingPage?: () => void,
        showAdvanced?: () => void,
        showSimple?: () => void,
        getSettingsDOM?: () => JQuery,
        settings?: IAnyMap,
        initPage?:(_title: string, _showAdvancedBtn: boolean, _showDeleteText: string, _help: string, _externalHelp?: string, _showCopy?: boolean)=>void
     }
    export type IPluginBoilerPlateControlOptions = IBaseControlOptions
}
