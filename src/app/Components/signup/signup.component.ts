import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RestService } from 'src/app/Services/rest.service';
import { LoginComponent } from '../login/login.component';
import { Users } from 'src/app/Classes/users';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  selected = 'code';
  nameError = '';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  users = {
    id: 0,
    name: '',
    email: '',
    code: '',
    number: '',
    password: '',
  };
  items: any;
  itemsCollection: any
  constructor(public dialog: MatDialog, private restService: RestService, private _snackBar: MatSnackBar,private afs: AngularFirestore,private http:HttpClient) { 
    // this.itemsCollection = this.afs.collection('users').snapshotChanges().map((changes: { payload: { doc: { data: () => any; id: any; }; }; }[]) =>{
    //   return changes.map((a: { payload: { doc: { data: () => any; id: any; }; }; }) =>{
    //     const data = a.payload.doc.data();
    //     data.id = a.payload.doc.id;
    //     console.log(data);
    //      return data;
    //   })
    // });
    // console.log(this.itemsCollection);
  }

  ngOnInit(): void {
    // this.itemsCollection = this.afs.collection<any>('users');
    // this.items = this.itemsCollection.valueChanges()
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, '', {
      duration: 1000
    });
  }
  signIn(){
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  createProduct(): void {
    const data = {
      id: this.users.id,
      name: this.users.name,
      email: this.users.email,
      code: this.users.code,
      number: this.users.number,
      password: this.users.password
    };
    if(data.name == ""){
      this.nameError = "Please add name";
      this.openSnackBar("Please add Name", "x")
    }else if(data.email == ""){
      this.openSnackBar("Please add Email address", "x")
    }else if(data.code == ""){
      this.openSnackBar("Please add Contact Code", "x")
    }else if(data.number == ""){
      this.openSnackBar("Please add Contact Number", "x")
    }else if(data.password == ""){
      this.openSnackBar("Please add Password", "x")
    }else{
      console.log(data);
      this.restService.createUser(data)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });
        this.dialog.open(LoginComponent);
    }
    
  }

}
