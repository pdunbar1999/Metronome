import { Component, OnInit } from '@angular/core';
import { SongListService } from '../services/song-list.service';
import { Song } from '../models/Songs';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-saved-beats',
  templateUrl: './saved-beats.component.html',
  styleUrls: ['./saved-beats.component.css']
})
export class SavedBeatsComponent implements OnInit {

  //DI
  constructor(private songListService: SongListService) { }


  //To send back to parent component
  @Output() songChanged: EventEmitter<Song> = new EventEmitter()

  ngOnInit(): void {
    this.getListOfSongs();
  }

  //What song the user selects from the list
  selectedSong?: Song;

  //Selects a different song
  onSelect(song: Song): void {
    this.selectedSong = song;
    //Emits event to parent component to change the BPM
    this.songChanged.emit(song);
  }

  //Empty list
  listOfSongs: Song[] = []


  //Subscirbes to the observable
  getListOfSongs(): void {
    this.songListService.getSongList().subscribe(list => this.listOfSongs = list);
  }

}
