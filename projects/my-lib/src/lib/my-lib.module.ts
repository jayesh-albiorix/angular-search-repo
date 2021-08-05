import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MyLibComponent } from './my-lib.component';



@NgModule({
  declarations: [
    MyLibComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    MyLibComponent
  ]
})
export class MyLibModule { }
