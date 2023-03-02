import { BoardInterface } from './../../shared/types/board.interface';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  baord$ = new BehaviorSubject<BoardInterface | null>(null);

  constructor() {}

  setBoard(board: BoardInterface): void {
    this.baord$.next(board);
  }
}
