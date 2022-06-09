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
  value = 100;
  placeholder = 100;
  isPlaying = false;
  audio1 = this.loadAudioFirstBeat();
  audio2 = this.loadAudioSubsequentBeat();
  subscription: Subscription;
  stressFirstBeat = true;

  
  @ViewChild(SavedBeatsComponent) SavedBeatsComponent! : SavedBeatsComponent;


  //Called when a song is selected from the child component saved-beats
  songChangedHandler(song: Song) {
    this.value = song.bpm;
    this.stressFirstBeat = song.stressFirstBeat;
    
  }

  //Emits values from 0 to infinity at a given interval
  timerObservable = interval(60000/this.value);

  //What is called when you subscribe
  myObserver = {
    next: x => this.playTicks(x),
    error: err => console.error('Observer got an error: ' + err),
  };

  ngOnInit(): void {
    
  }

  //TODO:
  //Add a check to see if slider changed, buttons pressed, or streessfirstbeatchanged
  // when a song is already selected. Need to deselect the current song if that happens

  //This is mostly to check for the slider changes
  ngDoCheck(): void {

    //Checks if value has changed by hitting the buttons or slider
    //Have to use this way for the slider
    if(this.value != this.placeholder){
      console.log(this.value);
      console.log(this.placeholder);
      this.timerObservable = interval(60000/this.value);


      console.log("whend o you fure");
      //If a song has been selected, deselect it since it edited the metronome 
      // this.SavedBeatsComponent.selectedSong = "None";

      //If BPM changes while it is still playing
       if(this.isPlaying == true) {

        //Stop the current metronome by unsubsribing to the Observable that holds the interval
        this.subscription && this.subscription.unsubscribe();

        //Restart and subscribe to the observable with the new interval
        this.subscription = this.timerObservable.subscribe(this.myObserver); 
       }
  
    }
    //Change placeholder to be able to check if it changes again
    this.placeholder = this.value
  }

  
  //Add one BPM
  AddOne() {
    if(this.value < 200){
      this.value = this.value + 1;
    }
    
  }

  //Subtract one BPM
  SubtractOne() {
    if(this.value > 1){
      this.value = this.value - 1;
    }
  
  }

  PlayBack(){
    if(this.isPlaying == false){
      this.isPlaying = !this.isPlaying;
      this.subscription = this.timerObservable.subscribe(this.myObserver); 

    }
    else{
      this.isPlaying = !this.isPlaying;
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
