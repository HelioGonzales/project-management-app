import { InlineFormModule } from './../shared/modules/inline-form/inline-form.module';
import { BoardsService } from './../shared/services/boards.service';
import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './boards/boards.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { TopbarModule } from '../shared/modules/topbar/topbar.module';

const routes: Routes = [
  {
    path: 'boards',
    component: BoardsComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
];

@NgModule({
  declarations: [BoardsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InlineFormModule,
    TopbarModule,
  ],
  providers: [AuthGuard, BoardsService],
})
export class BoardsModule {}
