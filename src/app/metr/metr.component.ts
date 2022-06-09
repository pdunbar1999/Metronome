import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Song } from '../models/Songs';
import { SavedBeatsComponent } from '../saved-beats/saved-beats.component';

@Component({
  selector: 'app-metr',
  templateUrl: './metr.component.html',
  styleUrls: ['./metr.component.css']
})
export class MetrComponent {


  //NEXT UP
  //Stress first beat feature
  //Save specific beats and add titles
    //Add users to and backend functionality to that?
  //Add 3/4 and other types
  //Improve UI on the toolbar
  //Improve UI in general

  constructor() { 
    
  }


  //We use value to measure bpm, but it shouldnt, should be totally seperate since we need it for local variable changes in buttons and slider


  BPM = 100;
  // value = 100;
  // placeholder = 100;
  isPlaying = false;
  audio1 = this.loadAudioFirstBeat();
  audio2 = this.loadAudioSubsequentBeat();
  subscription: Subscription;
  stressFirstBeat = true;
  currentSelectedSongPlaceholder = "None";

  
  @ViewChild(SavedBeatsComponent) SavedBeatsComponent! : SavedBeatsComponent;


  //Called when a song is selected from the child component saved-beats
  songChangedHandler(song: Song) {
    this.BPM = song.bpm;
    this.stressFirstBeat = song.stressFirstBeat;
    this.updateBPMAndTitleBooleanAndRestartMetronome(true);
  }

  //Emits values from 0 to infinity at a given interval
  timerObservable = interval(60000/this.BPM);

  //What is called when you subscribe
  myObserver = {
    next: x => this.playTicks(x),
    error: err => console.error('Observer got an error: ' + err),
  };

  ngOnInit(): void {
    
  }

  //Checks for changes in the slider, event.value represents the slider value
  onSliderChange(event) {
    this.BPM = event.value;
    this.updateBPMAndTitleBooleanAndRestartMetronome(false);
    
  }

  //Function that fires when BPM is changed by slider or buttons
  //Changes the currently selected songed to none if a song is currently selected
  //Updates the BPM and restarts the metronome automatically
  updateBPMAndTitleBooleanAndRestartMetronome(songChanged) {

    console.log(this.SavedBeatsComponent.selectedSong);
    //Resets the observable to the new BPM value
    this.timerObservable = interval(60000/this.BPM);
    

    //If BPM changes while the metronome is currently playing
    if(this.isPlaying == true) {

      //Stop the current metronome by unsubsribing to the Observable that holds the interval
      this.subscription && this.subscription.unsubscribe();

      //Restart and subscribe to the observable with the new interval
      this.subscription = this.timerObservable.subscribe(this.myObserver); 
     }

    //This means that it was a button or slider change, so just make the currently selected song to None
    if(songChanged==false) {
      this.SavedBeatsComponent.selectedSong = "None";
    }

  }


  
  //Add one BPM and update
  AddOne() {
    if(this.BPM < 200){
      this.BPM = this.BPM + 1;
      //false means that we aren't selecting a new song
      this.updateBPMAndTitleBooleanAndRestartMetronome(false);
    }
    
    
  }

  //Subtract one BPM and update
  SubtractOne() {
    if(this.BPM > 1){
      this.BPM = this.BPM - 1;
      //false means that we aren't selecting a new song
      this.updateBPMAndTitleBooleanAndRestartMetronome(false);
    }
  
  }

  //Starts and stops the metronome
  PlayBack(){
    
    //If play button was clicked
    if(this.isPlaying == false){
      //Update the isPLaying value
      this.isPlaying = !this.isPlaying;

      //Subscribe to the observable meteronome interval
      this.subscription = this.timerObservable.subscribe(this.myObserver); 

    }
    //If the pause button was clicked
    else{
      //Update the isPlaying value
      this.isPlaying = !this.isPlaying;

      //Unsubscribe to the observable meteronome interval
      this.subscription && this.subscription.unsubscribe();
    }
  }

  playTicks(beatNumber){
    //If it is the first beat and we want to stress it
    if(((beatNumber+1)%4 == 1) && this.stressFirstBeat==true) {
      this.audio1.play()
    }
    else {
      this.audio2.play()
    }
  }
  
  loadAudioFirstBeat() {
    let audio = new Audio()
    audio.src = "../../assets/Sounds/1.wav"
    audio.load();
    return audio;
  }
  
  loadAudioSubsequentBeat() {
    let audio = new Audio()
    audio.src = "../../assets/Sounds/2.wav"
    audio.load();
    return audio;
  }

}
