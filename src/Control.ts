namespace BoilerPlate{
   export class  Control extends BaseControl {
    
        private settings: IPluginBoilerPlateControlOptions;
        private lastValueChanged:number;
        private _editor:JQuery;
        private doesRequireContent:boolean = false;
        private defaultValue:any = "no value yet"
        constructor( control:JQuery) {
            super(control);
        } 
        
        init(  options:IPluginBoilerPlateControlOptions) {
            let that = this;
    
            var defaultOptions:IPluginBoilerPlateControlOptions = {
                
                controlState: ControlState.FormView, // read only rendering
                canEdit: false, // whether data can be edited 
                dummyData: false, // fill control with a dumy text (for form design...)
                valueChanged: function () {
                }, // callback to call if value changes
                parameter: {
                    readonly: false, // can be set to overwrite the default readonly status
                    allowResize: true, // allow to resize control
                    hideFullscreen:false //  hide fullscreen
                }
            };
            this.settings = ml.JSON.mergeOptions(defaultOptions, options);
            // have default values
            if (!this.settings.fieldValue && this.settings.parameter.initialContent && !this.settings.item ) {
                this.settings.fieldValue =  this.settings.parameter.initialContent;
            }
            if (typeof this.settings.fieldValue === 'undefined' || this.settings.fieldValue === "") {
                this.settings.fieldValue = this.defaultValue;
            }
            //For print        
            if (this.settings.controlState === ControlState.Print || this.settings.controlState === ControlState.Tooltip) {
                this._root.append(super.createHelp(this.settings));
                var css = (this.settings.controlState === ControlState.Print) ? "class='printBox'" : "";
                this._root.append(`<pre>${this.settings.fieldValue}></pre>`);
                return;
            }
    
            if (options.parameter && options.parameter.requiresContent) {
                this.doesRequireContent = options.parameter.requiresContent;
            }
            let helpLine = this._root.append(super.createHelp(this.settings));
            var ctrlContainer = $("<div>").addClass("baseControl");
            
            this._root.append(ctrlContainer);
            this._editor = this.createEditorFromDOM();
          
            ctrlContainer.append(this._editor);
            
            this._editor.val(this.settings.fieldValue);
    
            // remove mouseout to avoid frequent changes change
            this._editor.change(function () {
                clearTimeout(that.lastValueChanged);
                console.log(`${Plugin.fieldType} has changed`)
                that.lastValueChanged = window.setTimeout((noCallBack?:boolean) => that.valueChanged(noCallBack), 333);
            });
            this._editor.on('blur', function () {
                if (that.settings.focusLeft) {
                    that.settings.focusLeft();
                }
                
            });
            var rt = this._editor.val();
            this._root.data("original", rt);
            this._root.data("new", rt);
        }
        
        // public interface 
        hasChanged():boolean {
            // make sure no changes are pending
            clearTimeout(this.lastValueChanged);
            // this will take and text from the editor and put it int he variable  _root.data("new")
            // but it will not recursively trigger a change
            this.valueChanged(true);
            // now compare
            return  this._root.data("original") !== this._root.data("new");
        }
        
        getValue():string {
            // make sure no changes are pending
            clearTimeout(this.lastValueChanged);
            this.valueChanged(true);
            let text = this._root.data("new");
            return DOMPurify.sanitize(text);
        }
    
        requiresContent() {
            return this.doesRequireContent;
        }
    
        refresh() {
        }
        setValue(newValue:string, reset?:boolean) {
            if (this._editor) {
                this._editor.val(newValue);
            }
    
            this._root.data("new", newValue);
            if (reset) {
                this._root.data("original", newValue);
            }
        }
    
        destroy () {
            if ( this._editor ) {
                this._editor.off();
                this._editor = null;
            }
        }
        
        resizeItem() {}
        
        //  private functions
        private valueChanged(noCallback?:boolean) {
            if (this._editor) {
                this._root.data("new", this._editor.val());
            }
            if (this.settings.valueChanged && !noCallback ) { 
                // removed cause the event should be sent also sent if something changes back to normal ... && this._root.data("new")!=this._root.data("original")) {
                this.settings.valueChanged.apply(null);
            }
        }
    
    
        createEditorFromDOM(): JQuery {
            let that = this ;
            return $(`<div>
                        <pre>${JSON.stringify(that.settings)}</pre>
                    <div> `);
        }
    
    
    }

}