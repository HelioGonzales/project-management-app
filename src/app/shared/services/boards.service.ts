import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BoardInterface } from './../types/board.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private http: HttpClient) {}

  getBoards(id: string): Observable<BoardInterface[]> {
    const url = `${environment.apiUrl}/boardsSet/${id}`;
    return this.http.get<BoardInterface[]>(url);
  }

  getBoard(boardId: string): Observable<BoardInterface> {
    const url = `${environment.apiUrl}/boards/${boardId}`;
    return this.http.get<BoardInterface>(url);
  }

  createBoard(
    title: string,
    owner: string,
    users: string[] = []
  ): Observable<BoardInterface> {
    const url = `${environment.apiUrl}/boards`;
    return this.http.post<BoardInterface>(url, { title, owner, users });
  }
}
