import { BoardService } from './services/board.service';
import { Routes, RouterModule } from '@angular/router';
import { TopbarModule } from './../shared/modules/topbar/topbar.module';
import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board/board.component';
import { AuthGuard } from '../auth/services/auth.guard';

const routes: Routes = [
  {
    path: 'boards/:boardId',
    component: BoardComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
];

@NgModule({
  declarations: [BoardComponent],
  imports: [CommonModule, TopbarModule, RouterModule.forChild(routes)],
  providers: [BoardService],
})
export class BoardModule {}
