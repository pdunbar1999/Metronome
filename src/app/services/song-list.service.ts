import { Injectable } from '@angular/core';
import { Song, listOfSongs } from '../models/Songs'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongListService {

  constructor() { }

  

  // listOfSongs: Song[]=[]
  

  // addSong(song: Song) {
  //   this.listOfSongs.push(song);
  // }

  // removeSong(songID) {
  //   this.listOfSongs.filter(id => {
  //     if (id != songID) {
  //       return id;
  //     }
  //   })
  // }

  getSongList(): Observable<Song[]> {
    const songs = of(listOfSongs)
    return songs;
  }

  

}
