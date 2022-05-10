import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

   emailFormControl = new FormControl('', [Validators.required, Validators.email]);
   passwordFormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
  }

  submit(){
    if(this.emailFormControl.valid && this.passwordFormControl.valid) {
      this.router.navigate(['/home']);
    }
  }
}
