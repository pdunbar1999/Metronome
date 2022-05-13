import { Component, OnInit, Inject } from '@angular/core';
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
  name: string;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) { id, name,
      BPM, stressFirstBeat }: Song) {

    this.form = fb.group({
      name: [name, Validators.required],
      BPM: [BPM, Validators.required],
      stressFirstBeat: [stressFirstBeat, Validators.required]
    });

  }



  ngOnInit(): void {


  }

  save() {
    this.dialogRef.close(this.form.value);
    
  }





}

