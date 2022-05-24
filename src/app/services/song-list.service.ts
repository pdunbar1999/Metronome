import { Injectable } from '@angular/core';
import { Song } from '../models/Songs'
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SongListService {

  constructor() { }



  listOfSongs: Song[] = [
    {
      id: 1,
      name: "TESER",
      BPM: 80,
      stressFirstBeat: true
    },
    {
      id: 2,
      name: "Way I talk",
      BPM: 100,
      stressFirstBeat: false
    }
  ]


  addSong(newSong) {
    this.listOfSongs.push(newSong);

  }


  editSong(editedSong) {
    this.listOfSongs.map((x, index) => {
      //If we find the song we want to edit
      if (x.id == editedSong.id) {
        this.listOfSongs[index] = editedSong;
      }
    })

  }

  deleteSong(songID) {
    this.listOfSongs.filter(id => {
      if (id != songID) {
        return id;
      }
    })
  }

  getSongList(): Observable<Song[]> {
    const songs = of(this.listOfSongs)
    return songs;


  }



}
