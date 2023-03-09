import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from './../shared/services/task.service';
import { InlineFormModule } from './../shared/modules/inline-form/inline-form.module';
import { ColumnsService } from './../shared/services/columns.service';
import { BoardService } from './services/board.service';
import { Routes, RouterModule } from '@angular/router';
import { TopbarModule } from './../shared/modules/topbar/topbar.module';
import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board/board.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { TaskModalComponent } from './components/taskModal/task-modal/task-modal.component';

const routes: Routes = [
  {
    path: 'boards/:boardId',
    component: BoardComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
    children: [
      {
        path: 'tasks/:taskId',
        component: TaskModalComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [BoardComponent, TaskModalComponent],
  imports: [
    CommonModule,
    TopbarModule,
    RouterModule.forChild(routes),
    TopbarModule,
    InlineFormModule,
    ReactiveFormsModule,
  ],
  providers: [BoardService, ColumnsService, TaskService],
})
export class BoardModule {}
