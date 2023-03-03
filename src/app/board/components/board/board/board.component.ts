import { SockectEventsEnum } from './../../../../shared/types/socketEvents.enum';
import { BoardsService } from 'src/app/shared/services/boards.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { BoardService } from 'src/app/board/services/board.service';
import { filter, Observable } from 'rxjs';
import { SockectService } from 'src/app/shared/services/sockect.service';
import { BoardInterface } from 'src/app/shared/types/board.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  boardId!: string;
  board$!: Observable<BoardInterface>;

  constructor(
    private boardsSvc: BoardsService,
    private route: ActivatedRoute,
    private boardSvc: BoardService,
    private socketSvc: SockectService,
    private router: Router
  ) {
    this.route.params.subscribe((id) => {
      this.boardId = id['boardId'];
    });
    // const boardId = this.route.snapshot.paramMap.get('boardId');
    if (!this.boardId) {
      throw new Error('Can not get boardID from url');
    }

    // this.boardId = boardId;
    this.board$ = this.boardSvc.baord$.pipe(filter(Boolean));
  }

  ngOnInit(): void {
    this.socketSvc.emit(SockectEventsEnum.boardsJoin, {
      boardId: this.boardId,
    });
    this.fetchData();
    this.initializeListeners();
  }

  initializeListeners(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('leaving a page');
        this.boardSvc.leaveBoard(this.boardId);
      }
    });
  }

  fetchData(): void {
    this.boardsSvc.getBoard(this.boardId).subscribe((board) => {
      this.boardSvc.setBoard(board);
    });
  }
}
