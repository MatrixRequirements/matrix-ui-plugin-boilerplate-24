import GenericFieldHandler = matrixApi.GenericFieldHandler;
import IFieldHandler = matrixApi.IFieldHandler;
import {Plugin} from "../Main";
import {IPluginFieldValue, IProjectSettings, IServerSettings} from "../Interfaces";

export class FieldHandler implements IFieldHandler {
    private data: IPluginFieldValue;

    constructor( private fieldType: string, private config: matrixApi.IPluginConfig<IServerSettings, IProjectSettings>){

    }

    getData(): string {
        return JSON.stringify(this.data);
    }

    getFieldType(): string {
        return Plugin.config.field.fieldType;
    }

    initData(serializedFieldData: string): any {
        try {
            this.data = JSON.parse(serializedFieldData);
        } catch (e) {
            console.warn(`Failed to parse data for field  ${this.getFieldType()} with data ${serializedFieldData}`);
        }
        if (!this.data) {
            this.data = {value: ""};
        }
    }

    setValue(data: IPluginFieldValue) {
        this.data = data;
    }
}
