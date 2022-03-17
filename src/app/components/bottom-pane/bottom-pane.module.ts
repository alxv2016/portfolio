import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BottomPaneComponent} from './bottom-pane.component';
import {BottomPaneDirective} from './bottom-pane.directive';

@NgModule({
  declarations: [BottomPaneComponent, BottomPaneDirective],
  imports: [CommonModule],
  exports: [BottomPaneDirective],
})
export class BottomPaneModule {}
