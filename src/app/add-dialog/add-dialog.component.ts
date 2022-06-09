import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Song } from '../models/Songs';


@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDialogComponent>) {

    this.form = fb.group({
      title: ['',Validators.compose([Validators.required, Validators.maxLength(40)])],
      bpm: ['',Validators.compose([Validators.required, Validators.min(1), Validators.max(200), Validators.pattern("^[0-9]*$")])],
      stressFirstBeat: ['',Validators.required]
    });
  };

  ngOnInit(): void {
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }

  }
}
