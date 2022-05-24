import { Component, OnInit } from '@angular/core';
import { SongListService } from '../services/song-list.service';
import { Song } from '../models/Songs';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component'
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import * as uuid from 'uuid';

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

  //Empty list
  listOfSongs: Song[] = []

  //What song the user selects from the list
  selectedSong = "None";

  //Selects a different song
  onSelect(song: Song): void {
    this.selectedSong = song.name;
    //Emits event to parent component to change the BPM
    this.songChanged.emit(song);
  }

  //When user clicks the add or edit button
  editDialog(song: Song) {


    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    //Passing data to  dialog
    dialogConfig.data = song;


    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);

    //If this is an edit. If song check to see if data was passed in

    dialogRef.afterClosed().subscribe(
      data => {
        //If the user clicked the backdropped, don't edit the song
        //This is done by checking if the data is undefined
        if(data !== undefined){
          var editedSong = this.createSongObject(data)
          this.songListService.editSong(editedSong)
          this.onSelect(editedSong);
        }
      }
    )

  }

  addDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        //If the user clicked the backdropped, don't add the song
        //This is done by checking if the data is undefined
        if(data !== undefined){
          var newSong = this.createSongObject(data)
          this.songListService.addSong(newSong)
          //Select the newSong on the metronome
          this.onSelect(newSong);
        }
        
      }
    )
  }


  //This might be wrong, if were creating a song, then there isn't a data.id attatched already.
  //Creating new object of song and filling in with the data passed
  createSongObject(data) {
    var newSong = <Song>{};
    //If were adding a new song, then there is no id.
    if(data.id !== undefined) {
      newSong.id = uuid.v4();
    }
    //If were editing a song, there is already an id attatched to it.
    else {
      newSong.id = data.id;
    }
    newSong.id = data.id;
    newSong.name = data.name;
    newSong.BPM = data.BPM;
    if (data.stressFirstBeat == 'true') {
      newSong.stressFirstBeat = true;
    }
    else {
      newSong.stressFirstBeat = false;
    }

    return newSong;
  }

  deleteSong(data){
    this.createSongObject
    this.songListService.deleteSong(data.id);
  }







  //Subscirbes to the observable
  getListOfSongs(): void {
    this.songListService.getSongList().subscribe(list => this.listOfSongs = list);
  }



}
