import { ColumnInterface } from 'src/app/shared/types/column.interfacec';
import { FormBuilder } from '@angular/forms';
import { TaskInterface } from 'src/app/shared/types/task.interface';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { BoardService } from './../../../services/board.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, HostBinding, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnDestroy {
  boardId!: string;
  taskId!: string;
  task$: Observable<TaskInterface>;
  // task$: any;
  data$: Observable<{ task: TaskInterface; columns: ColumnInterface[] }>;
  // data$: Observable<any>;

  columnForm = this.fb.group({
    columnId: [''],
  });

  unsubscribe$ = new Subject<void>();
  @HostBinding('class') classes = 'task-modal';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardSvc: BoardService,
    private fb: FormBuilder
  ) {
    this.route.parent?.params.subscribe((id: Params) => {
      this.boardId = id['boardId'];
    });

    this.route.params.subscribe((id: Params) => {
      this.taskId = id['taskId'];
    });

    if (!this.boardId) {
      throw new Error('Can´t get boardID from URL');
    }
    if (!this.taskId) {
      throw new Error('Can´t get taskID from URL');
    }

    this.task$ = this.boardSvc.tasks$.pipe(
      map((tasks) => {
        return tasks.find((task) => task._id === this.taskId);
      }),
      filter(Boolean)
    );

    this.data$ = combineLatest([this.task$, this.boardSvc.columns$]).pipe(
      map(([task, columns]) => ({
        task,
        columns,
      }))
    );

    this.task$.pipe(takeUntil(this.unsubscribe$)).subscribe((task) => {
      this.columnForm.patchValue({
        columnId: task.columnId,
      });
    });
  }

  goToBoard(): void {
    this.router.navigate(['boards', this.boardId]);
  }

  updateTaskName(taskName: string): void {
    console.log(taskName);
  }
  updateTaskDescription(taskDescription: string): void {
    console.log(taskDescription);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
