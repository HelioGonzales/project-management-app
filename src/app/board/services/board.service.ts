import { ColumnInterface } from './../../shared/types/column.interfacec';
import { SockectEventsEnum } from './../../shared/types/socketEvents.enum';
import { SockectService } from './../../shared/services/sockect.service';
import { BoardInterface } from './../../shared/types/board.interface';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TaskInterface } from 'src/app/shared/types/task.interface';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  baord$ = new BehaviorSubject<BoardInterface | null>(null);
  columns$ = new BehaviorSubject<ColumnInterface[]>([]);
  tasks$ = new BehaviorSubject<TaskInterface[]>([]);

  constructor(private sockectSvc: SockectService) {}

  setBoard(board: BoardInterface): void {
    this.baord$.next(board);
  }

  setTask(tasks: TaskInterface[]): void {
    this.tasks$.next(tasks);
  }

  setColumns(columns: ColumnInterface[]): void {
    this.columns$.next(columns);
  }

  leaveBoard(boardId: string): void {
    this.baord$.next(null);
    this.sockectSvc.emit(SockectEventsEnum.boardsLeave, { boardId });
  }
}
