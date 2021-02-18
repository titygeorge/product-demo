import { Component, OnInit } from '@angular/core';
import { User } from  '../user';
import { AuthService } from  '../auth.service';
import { Router } from  '@angular/router';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm	 : FormGroup;
  	isSubmitted  =  false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
  	this.loginForm  =  this.formBuilder.group({
        email	: ['', [Validators.required, Validators.pattern(/^([_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,5}))$/)]],

      //   password: [ '', Validators.compose([
      //     Validators.required,
      //    CustomValidators.patternValidator(/\d/, { hasNumber: true }),
      //    CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      //    CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      //    CustomValidators.patternValidator(/[ [!@#$%^&*()_+-=[]{};':"|,.<>/?]/](<mailto:!@#$%^&*()_+-=[]{};':"|,.<>/?]/>), { hasSpecialCharacters: true }),
      //    Validators.minLength(8)])
      // ],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]]
    });
  }

  get formControls() { return this.loginForm.controls; }

   login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    } else {
    this.authService.loginFn(this.loginForm.value);
    this.router.navigateByUrl('/home');
	}
  }

}
