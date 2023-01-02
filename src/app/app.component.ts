import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CaseStudy'
a=false
b=""
x:any
  userForm = new FormGroup( {
    Sname: new FormControl(""),
    Spass: new FormControl(""),
  })
get SName() {
    return this.userForm.get('Sname')!;
  }
  get SPass() {
 return this.userForm.get('Spass')!;
  }
  getData(){
    let response=this.http.get("http://localhost:8083/case/super/"+this.SName.value);
    response.subscribe((data=>{
      this.x=data;  
      this.validate();
    } ));  
  }
  validate(){
    if(this.x!=null){
    if(this.x[0].name==this.SName.value && this.x[0].password == this.SPass.value){
this.a=true
this.b="you are a super user"
    }
  }
  else{
    this.b="you are not a super user"
  }
  }

 
showData() {
    console.log(this.SName.value)
    console.log(this.x[0].name)
    console.log(this.x[0].password)
    }
    constructor(private http:HttpClient){
      
    }
    ngOnInit(){
      
    }
}
