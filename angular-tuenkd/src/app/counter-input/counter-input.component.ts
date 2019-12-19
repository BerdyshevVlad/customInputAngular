import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'counter-input',
    template: `
    <button (click)="increment()">+</button>
    {{counterValue}}
    <button (click)="decrement()">-</button>
  `,
  providers:[{ 
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CounterInputComponent),
    multi: true
  }]
})

export class CounterInputComponent implements ControlValueAccessor {
    
    propagateChange = (_: any) => {};

    @Input()
    _counterValue = 0;

    get counterValue() {
        return this._counterValue;
      }

      set counterValue(val) {
        this._counterValue = val;
        this.propagateChange(this._counterValue);
      }

    increment() {
        this.counterValue++;
    }

    decrement() {
        this.counterValue--;
    }

    writeValue(value: any) {
        if (value) {
          this.counterValue = value;
        }
    } 

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any): void {
        throw new Error("Method not implemented.");
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error("Method not implemented.");
    }
}