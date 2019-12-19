import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CounterInputComponent } from './counter-input/counter-input.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
    declarations: [AppComponent, CounterInputComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
