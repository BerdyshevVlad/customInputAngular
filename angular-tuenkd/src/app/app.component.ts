import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { createCounterRangeValidator } from './counter-input/counter-input.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
    form: FormGroup;

    maxValue = 10;
    minValue = 0;
    
    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({
            counter: [5, createCounterRangeValidator(this.maxValue,this.minValue)]
        });
    } 
}
