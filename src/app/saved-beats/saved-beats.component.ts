import { Component, OnInit } from '@angular/core';
import { SongListService } from '../services/song-list.service';
import { Song } from '../models/Songs';
import { Output, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component'
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import * as uuid from 'uuid';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-saved-beats',
  templateUrl: './saved-beats.component.html',
  styleUrls: ['./saved-beats.component.css']
})
export class SavedBeatsComponent implements OnInit {

  //DI
  constructor(private songListService: SongListService, private dialog: MatDialog) { }


  //To send back to parent component
  //This is fired when we click a new song, add a new song, or a edit a song.
  @Output() songChanged: EventEmitter<Song> = new EventEmitter()

  ngOnInit(): void {
    this.getListOfSongs();
    
    
  }

  //Empty list
  listOfSongs: Song[]

  //What song the user selects from the list
   
  selectedSong = "None";

  //Selects a different song
  onSelect(song: Song): void {
    this.selectedSong = song.title;
    //Emits event to parent component to change the data
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
        //If the user escaped the dialog by clicking the backdropped, don't edit the song
        //This is done by checking if the data is undefined
        if(data !== undefined){

          
          var editedSong = this.createSongObject(data)
          this.songListService.editSong(editedSong).subscribe(updatedSongList => this.listOfSongs = updatedSongList);
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
          this.songListService.addSong(newSong).subscribe(song => this.listOfSongs.push(song));

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
    
    newSong.title = data.title;
    newSong.bpm = data.bpm;
    newSong.id = data.id;

    if (data.stressFirstBeat == 'true') {
      newSong.stressFirstBeat = true;
    }
    else {
      newSong.stressFirstBeat = false;
    }

    return newSong;
  }

  deleteSong(event, data){
    //This stops from the onSelect function in the HTML parent container from firing.
    event.stopPropagation();

    //If your deleting the song you currently have selected, change the currently selected song to None    
    if(data.title == this.selectedSong) {
      this.selectedSong = "None";

    }
    this.songListService.deleteSong(data.id).subscribe(updatedSongList => this.listOfSongs = updatedSongList);
    
  }





  //Subscirbes to the observable
  getListOfSongs(): void {
    // this.songListService.getSongList().subscribe(list => this.listOfSongs = list);
    this.songListService.getSongList().subscribe(list => this.listOfSongs = list);

  }




}
