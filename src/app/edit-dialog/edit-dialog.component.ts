import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Song } from '../models/Songs';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  form: FormGroup;
  //Need to load the stressFirstBeat into a string to autopopulate the value in the form
  firstBeatString: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    var id = data.id;
    var title = data.title;
    var bpm = data.bpm;
    var stressFirstBeat = data.stressFirstBeat;

    if (stressFirstBeat == true) {
      this.firstBeatString = 'true'
    }
    else if (stressFirstBeat == false) {
      this.firstBeatString = 'false'
    }


    // //This might not be safe with stressFirstBeat, since its not a boolean, its a string??
    // //Will see how the error works when adding a song and the default is null?
    this.form = fb.group({
      id: [id],
      title: [title, Validators.compose([Validators.required, Validators.maxLength(40)])],
      bpm: [bpm, Validators.compose([Validators.required, Validators.min(1), Validators.max(200), Validators.pattern("^[0-9]*$")])],
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
