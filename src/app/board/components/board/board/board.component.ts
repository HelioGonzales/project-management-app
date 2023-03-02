import { BoardInterface } from './../../../../shared/types/board.interface';
import { BoardsService } from 'src/app/shared/services/boards.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from 'src/app/board/services/board.service';
import { filter, Observable } from 'rxjs';

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
    private boardSvc: BoardService
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
    this.fetchData();
  }

  fetchData(): void {
    this.boardsSvc.getBoard(this.boardId).subscribe((board) => {
      this.boardSvc.setBoard(board);
    });
  }
}
