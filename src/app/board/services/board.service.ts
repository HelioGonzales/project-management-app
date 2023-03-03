import { SockectEventsEnum } from './../../shared/types/socketEvents.enum';
import { SockectService } from './../../shared/services/sockect.service';
import { BoardInterface } from './../../shared/types/board.interface';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  baord$ = new BehaviorSubject<BoardInterface | null>(null);

  constructor(private sockecSvc: SockectService) {}

  setBoard(board: BoardInterface): void {
    this.baord$.next(board);
  }

  leaveBoard(boardId: string): void {
    this.baord$.next(null);
    this.sockecSvc.emit(SockectEventsEnum.boardsLeave, { boardId });
  }
}
