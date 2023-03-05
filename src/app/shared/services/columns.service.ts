import { SockectEventsEnum } from './../types/socketEvents.enum';
import { SockectService } from 'src/app/shared/services/sockect.service';
import { ColumnInputInterface } from './../types/columnInput.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ColumnInterface } from '../types/column.interfacec';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  constructor(private http: HttpClient, private socketSvc: SockectService) {}

  getColumns(boardId: string): Observable<ColumnInterface[]> {
    const url = `${environment.apiUrl}/boards/${boardId}/columns`;
    return this.http.get<ColumnInterface[]>(url);
  }

  // createColumn(columnInput: ColumnInputInterface): void {
  //   this.socketSvc.emit(SockectEventsEnum.columnsCreate, columnInput);
  // }

  createColumn(
    boardId: string,
    title: string,
    order: number
  ): Observable<ColumnInterface> {
    const url = `${environment.apiUrl}/boards/${boardId}/columns`;
    return this.http.post<ColumnInterface>(url, { title, order });
  }
}
