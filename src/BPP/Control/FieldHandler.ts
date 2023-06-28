import GenericFieldHandler = matrixApi.GenericFieldHandler;
import IFieldHandler = matrixApi.IFieldHandler;
import {Plugin} from "../Main";
import {IProjectSettings, IServerSettings} from "../Interfaces";
export class FieldHandler implements IFieldHandler{
    constructor(private fieldType: string, private  config: matrixApi.IPluginConfig<IServerSettings, IProjectSettings>) {
    }

    private data: string;
    getData(): string {
        return this.data;
    }

    getFieldType(): string {
        return Plugin.config.field.fieldType;
    }

    initData(serializedFieldData: string): any {
        this.data = serializedFieldData;
    }


    setData(data:string) {
        this.data = data;
    }
}