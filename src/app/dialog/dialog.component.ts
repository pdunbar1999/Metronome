import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Song } from '../models/Songs';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  form: FormGroup;
  //Need to load the stressFirstBeat into a string to autopopulate the value in the form
  firstBeatString: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) { id, name,
      BPM, stressFirstBeat }: Song) {


    if (stressFirstBeat == true) {
      this.firstBeatString = 'true'
    }
    else {
      this.firstBeatString = 'false'
    }


    //This might not be safe with stressFirstBeat, since its not a boolean, its a string??
    //Will see how the error works when adding a song and the default is null?
    this.form = fb.group({
      name: [name, Validators.compose([Validators.required, Validators.maxLength(40)])],
      BPM: [BPM, Validators.compose([Validators.required, Validators.min(1), Validators.max(200), Validators.pattern("^[0-9]*$")])],
      stressFirstBeat: [this.firstBeatString, Validators.required]
    });

  }


  ngOnInit(): void {
   

  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }


  }





}

