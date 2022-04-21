import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OffCanvasComponent} from './off-canvas.component';
import {OffCanvasDirective} from './off-canvas.directive';

@NgModule({
  declarations: [OffCanvasComponent, OffCanvasDirective],
  imports: [CommonModule],
  exports: [OffCanvasDirective],
})
export class OffCanvasModule {}
