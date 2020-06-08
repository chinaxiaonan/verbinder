import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../httprequest.service';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateLoginForm: FormGroup;
  validateSigninForm: FormGroup;
  confirmationValidator : ValidatorFn; 
  loginfail:boolean = false;
  userexist:boolean = false;
  username:string;
  userpwd:string;
  repeatpwd:string;
  curlogin:boolean;
  constructor(private httpRequest:HttprequestService, private fb: FormBuilder, private bsModalRef: BsModalRef, private router:Router) {
    this.curlogin = true;
    this.confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { required: true };
      } else if (control.value !== this.validateSigninForm.controls.controlUserPwd.value) {
        return { notsame: true, error: true };
      }
      return {};
    };
   }

  ngOnInit() {
    this.validateLoginForm = this.fb.group({
      controlUserName: [null, [Validators.required]],
      controlUserPwd: [null, [Validators.required]]
    });
    this.validateSigninForm = this.fb.group({
      controlUserName: [null, [Validators.required]],
      controlUserPwd: [null, [Validators.required]],
      controlUserPwdRepeat: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  createUser(): void{
    this.userexist = false;
    this.loginfail = false;
    for(const i in this.validateSigninForm.controls){
      this.validateSigninForm.controls[i].markAsDirty();
      this.validateSigninForm.controls[i].updateValueAndValidity();
    }
    if(this.validateSigninForm.valid){
      var user = {
        username: this.validateSigninForm.controls['controlUserName'].value,
        userpwd: this.validateSigninForm.controls['controlUserPwd'].value
      }
      this.httpRequest.createUser(user, result=>{
        if(result.uid === -2){
          this.userexist = true;
        }
        else if (result.uid !== -1){
          this.userexist = false;
          this.bsModalRef.hide();
          window.location.reload();
        }
        else {
          this.userexist = false;
        }
      });

    }
  }

  login(): void{
    this.loginfail = false;
    this.userexist = false;
    for(const i in this.validateLoginForm.controls){
      this.validateLoginForm.controls[i].markAsDirty();
      this.validateLoginForm.controls[i].updateValueAndValidity();
    }
    if(this.validateLoginForm.valid){
      var user = {
        username: this.validateLoginForm.controls["controlUserName"].value,
        userpwd: this.validateLoginForm.controls["controlUserPwd"].value
      }
      this.httpRequest.login(user, result=>{
        if(result.uid!=-1){
          this.loginfail = false;
          sessionStorage.setItem("username", user.username);
          this.bsModalRef.hide();
          window.location.reload();
        }
        else{
          this.loginfail = true;
        }
      }, err=>{

      });
    }
    
    /**if(this.username&&this.userpwd&&this.username.trim().length>0&&this.userpwd.trim().length>0){
      var user = {
        username: this.username.trim(),
        userpwd: this.userpwd.trim()
      }
      
    }**/
    
  }

  toggleForm(): void {
    this.username = "";
    this.userpwd = "";
    this.curlogin = !this.curlogin;
  }

}
