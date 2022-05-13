import { Component, OnInit } from '@angular/core';
import { SongListService } from '../services/song-list.service';
import { Song } from '../models/Songs';
import { Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component'

@Component({
  selector: 'app-saved-beats',
  templateUrl: './saved-beats.component.html',
  styleUrls: ['./saved-beats.component.css']
})
export class SavedBeatsComponent implements OnInit {

  //DI
  constructor(private songListService: SongListService, private dialog: MatDialog) { }


  //To send back to parent component
  @Output() songChanged: EventEmitter<Song> = new EventEmitter()

  ngOnInit(): void {
    this.getListOfSongs();
  }

  //What song the user selects from the list
  selectedSong = "None";

  //Selects a different song
  onSelect(song: Song): void {
    this.selectedSong = song.name;
    //Emits event to parent component to change the BPM
    this.songChanged.emit(song);
  }

  //When user clicks the edit button
  openDialog(song:Song) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.data = song;

    this.dialog.open(DialogComponent, dialogConfig);
}

  //Empty list
  listOfSongs: Song[] = []


  //Subscirbes to the observable
  getListOfSongs(): void {
    this.songListService.getSongList().subscribe(list => this.listOfSongs = list);
  }

}
