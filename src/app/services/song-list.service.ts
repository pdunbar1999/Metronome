import { Injectable } from '@angular/core';
import { Song } from '../models/Songs'
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongListService {

  constructor(private http: HttpClient) { }


  private songsUrl = 'http://localhost:8080/api/v1/song'

  listOfSongs: Song[] = [
    
  ]


  addSong(newSong): Observable<Song> {
    return this.http.post<Song>(this.songsUrl, newSong)
    .pipe(
      catchError(this.handleError)
    );

  }


  editSong(editedSong): Observable<Song[]> {

    const url = this.songsUrl + '/' + editedSong.id;

    return this.http.put<Song[]>(url, editedSong)
    .pipe(
      catchError(this.handleError)
    )

  }

  deleteSong(id): Observable<Song[]>{

    const url = this.songsUrl + '/' + id;

    return this.http.delete<Song[]>(url)
    .pipe(
      catchError(this.handleError)
    
      
    )
  }
    //Find index where song to delete is
    // var index = this.listOfSongs.findIndex(function (song) {
    //   return song.id === data.id;
    // })
    // //Replace song by splicing 
    // if (index !== -1) this.listOfSongs.splice(index, 1);
  

  getSongList(): Observable<Song[]> {
    return this.http.get<Song[]>(this.songsUrl)
    .pipe(
      catchError(this.handleError)
    );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }



}
