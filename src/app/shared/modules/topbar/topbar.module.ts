import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar/topbar.component';

@NgModule({
  declarations: [TopbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [TopbarComponent],
})
export class TopbarModule {}
