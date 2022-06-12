import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Users } from 'src/app/Classes/users';
import { RestService } from 'src/app/Services/rest.service';
import { SharedService } from 'src/app/Services/shared.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
    email = '';
    password = '';
  constructor(public dialog: MatDialog,private restService:RestService,private sharedService: SharedService,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  openSnackBar(message: string, action: string) {
    // this._snackBar.open(message, action);
    this._snackBar.open(message, '', {
      duration: 1000
    });
  }
  signupDialog(){
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(SignupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getUsername(name:string): void{
    this.sharedService.getUserName(name);
  }
  login(){
    this.restService.getlogin().subscribe(resp =>{
      let response = Object.values(resp)
      let login:boolean = false;
      console.log(response);
      if(response.length){
        response.forEach(element => {
          if(element.email == this.email && element.password == this.password){
            login = true
            let name = element.name;
            console.log(name);
            this.getUsername(name);
            localStorage.setItem('username', name);
            this.openSnackBar("Login success", "x")
          }
        });
      }
      if(!login){
        this.openSnackBar("Login Failed", "x");
      }
    })
    // this.restService.getlogin(this.email, this.password)
    //   .subscribe(
    //     response => {
    //       var respSize = Object.keys(response).length;
    //       console.warn(respSize);
    //       if(respSize == 0){
    //         this.openSnackBar("Login Failed", "x");
    //       }
    //       let resp = response[0];
    //       let name = resp["name"];
    //       console.log(name);
    //       this.getUsername(name);
    //       localStorage.setItem('username', name);
    //       this.openSnackBar("Login success", "x")
    //     },
    //     error => {
    //       this.openSnackBar("Login Failed", "x");
    //       console.error(error);
    //     });
  }
}
