import { Component, Input, forwardRef, OnInit, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS } from '@angular/forms';

export function createCounterRangeValidator(maxValue, minValue) {
    return function validateCounterRange(c: FormControl) {
      let err = {
        rangeError: {
          given: c.value,
          max: maxValue,
          min: minValue
        }
      };
  
      return (c.value > +maxValue || c.value < +minValue) ? err: null;
    }
}

@Component({
    selector: 'counter-input',
    template: `
    <button (click)="increment()">+</button>
    {{counterValue}}
    <button (click)="decrement()">-</button>
  `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CounterInputComponent),
        multi: true
    }
    ]
})

export class CounterInputComponent implements ControlValueAccessor, OnInit,OnChanges  {

    propagateChange = (_: any) => { };

    validateFn:Function;


    @Input()
    counterRangeMax;
  
    @Input()
    counterRangeMin;

    @Input()
    _counterValue = 0;

    get counterValue() {
        return this._counterValue;
    }

    set counterValue(val) {
        this._counterValue = val;
        this.propagateChange(this._counterValue);
    }

    // ngOnInit() {
    //     this.validateFn = createCounterRangeValidator(this.counterRangeMax, this.counterRangeMin);
    //   }

      //instead ng on init; see diff
      ngOnChanges(changes) {
        if (changes.counterRangeMin || changes.counterRangeMax) {
          this.validateFn = createCounterRangeValidator(this.counterRangeMax, this.counterRangeMin);
        }
    }

      validate(c: FormControl) {
        return this.validateFn(c);
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