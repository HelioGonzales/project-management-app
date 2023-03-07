import { TaskInterface } from './../../../../shared/types/task.interface';
import { ColumnInputInterface } from './../../../../shared/types/columnInput.interface';
import { ColumnsService } from './../../../../shared/services/columns.service';
import { SockectEventsEnum } from './../../../../shared/types/socketEvents.enum';
import { BoardsService } from 'src/app/shared/services/boards.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { BoardService } from 'src/app/board/services/board.service';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { SockectService } from 'src/app/shared/services/sockect.service';
import { BoardInterface } from 'src/app/shared/types/board.interface';
import { ColumnInterface } from 'src/app/shared/types/column.interfacec';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  boardId!: string;
  // columnId = '64026184b564f2959da6e022';
  columnId!: string;
  // @ViewChild('columnId') columnId!: string;
  // board$!: Observable<BoardInterface>;
  // columns$!: Observable<ColumnInterface[]>;
  userId: any;
  data$: Observable<{
    board: BoardInterface;
    columns: ColumnInterface[];
    tasks: TaskInterface[];
  }>;

  constructor(
    private boardsSvc: BoardsService,
    private route: ActivatedRoute,
    private boardSvc: BoardService,
    private socketSvc: SockectService,
    private router: Router,
    private columnsSvc: ColumnsService,
    private tasksSvc: TaskService
  ) {
    this.route.params.subscribe((id) => {
      this.boardId = id['boardId'];
    });
    // const boardId = this.route.snapshot.paramMap.get('boardId');
    if (!this.boardId) {
      throw new Error('Can not get boardID from url');
    }

    // this.boardId = boardId;
    // this.board$ = this.boardSvc.baord$.pipe(filter(Boolean));
    // this.columns$ = this.boardSvc.columns$;

    this.data$ = combineLatest([
      this.boardSvc.baord$.pipe(filter(Boolean)),
      this.boardSvc.columns$,
      this.boardSvc.tasks$,
    ]).pipe(
      map(([board, columns, tasks]) => ({
        board,
        columns,
        tasks,
      }))
    );
  }

  // ngAfterViewInit(): void {
  //   console.log(this.columnId);
  // }

  ngOnInit(): void {
    this.socketSvc.emit(SockectEventsEnum.boardsJoin, {
      boardId: this.boardId,
    });
    this.fetchData();
    this.initializeListeners();
    // this.data$.subscribe((data: any) => {
    //   // this.columnId = data.columns._id;
    //   // console.log(this.columnId);
    //   // console.log(data.tasks.userId);
    // });
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

    this.columnsSvc.getColumns(this.boardId).subscribe((columns) => {
      this.boardSvc.setColumns(columns);
    });

    this.tasksSvc.getTasks(this.boardId).subscribe((tasks) => {
      console.log(tasks);

      this.boardSvc.setTask(tasks);
    });
  }

  createColumn(title: string, order = 1): void {
    // const columnInput: ColumnInputInterface = {
    //   title,
    //   order: 2,
    // };

    this.columnsSvc
      .createColumn(this.boardId, title, order)
      .subscribe((column) => {
        this.fetchData();
      });
  }

  createTask(title: string, columnId: string, userId: any) {
    userId.map((task: any) => (this.userId = task.userId));

    this.tasksSvc
      .createTask(this.boardId, columnId, title, this.userId)
      .subscribe((task) => {
        this.fetchData();
      });
  }

  getTaskByColumn(columnId: string, tasks: TaskInterface[]): TaskInterface[] {
    return tasks.filter((task) => {
      return task.columnId === columnId;
    });
  }
}
