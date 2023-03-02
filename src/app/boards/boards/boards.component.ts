import { BoardInterface } from './../../shared/types/board.interface';
import { Component, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/shared/services/boards.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  boards: BoardInterface[] = [];

  constructor(private boardsSvc: BoardsService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token') || '';
    if (token) {
      const user = JSON.parse(atob(token?.split('.')[1]));
      const id = `${user.id}`;

      this.boardsSvc.getBoards(id).subscribe((boards) => {
        this.boards = boards;
        console.log(this.boards);
      });
    } else {
      return;
    }
  }

  createBoard(title: string): void {
    const token = localStorage.getItem('token') || '';
    if (token) {
      const user = JSON.parse(atob(token?.split('.')[1]));
      const id = `${user.id}`;

      this.boardsSvc.createBoard(title, id).subscribe((createdboard) => {
        console.log(createdboard);
        this.boards = [...this.boards, createdboard];
      });
    } else {
      return;
    }
  }
}
