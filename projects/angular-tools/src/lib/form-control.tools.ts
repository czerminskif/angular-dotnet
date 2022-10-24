import { AbstractControl } from "@angular/forms";

export class FormControlTools {

    public static AddError(control: AbstractControl, errorName: string) {
        
        let current = control.errors;
        
        if (current == null) {
            current = {};
        }

        current[errorName] = true;
        control.setErrors(current);
    }

    public static RemoveError(control: AbstractControl, errorName: string) {

        let current = control.errors;
        
        if (current == null) {
            return;
        }

        delete current[errorName];

        if (Object.keys(current).length === 0) {
            current = null;
        }

        control.setErrors(current);
    }
}