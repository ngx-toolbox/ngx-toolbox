import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UtilModule } from '@ngx-toolbox/util';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UtilModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
