import { Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-custom-input',
    templateUrl: './custom-input.component.html',
    styleUrls: ['./custom-input.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomInputComponent),
            multi: true
        }
    ]
})

export class CustomInputComponent implements ControlValueAccessor {

    //https://medium.com/@majdasab/implementing-control-value-accessor-in-angular-1b89f2f84ebf

    constructor() { }

    onChange: any = () => { }
    onTouch: any = () => { }
    val = false;

    toogleValue = false;

    set value(val) {
        if (val !== undefined && this.val !== val) {
            this.val = val
            this.onChange(val)
            this.onTouch(val)
        }

    }

    writeValue(value: any) {
        this.value = value
    }

    registerOnChange(fn: any) {
        this.onChange = fn
    }

    onChangeMethod() {
        this.toogleValue = !this.toogleValue;

        if (this.toogleValue) {
            var element = document.getElementsByTagName('body')[0];
            element.style.background = "black";
            element.style.color = "white";

        }

        if (!this.toogleValue) {
            var element = document.getElementsByTagName('body')[0];
            element.style.background = "white";
            element.style.color = "black";
        }
    }

    registerOnTouched(fn: any) {
        this.onTouch = fn
    }

}