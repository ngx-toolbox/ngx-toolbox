import { NgModule } from '@angular/core';
import { WindowResizeObserver } from './provider/window-resize-observer';

@NgModule({
  providers: [WindowResizeObserver]
})
export class UtilModule {}
