import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CaseDataService } from 'src/app/case-data.service';
import { Superclass } from '../superclass';

@Component({
  selector: 'app-super-user',
  templateUrl: './super-user.component.html',
  styleUrls: ['./super-user.component.css']
})
export class SuperUserComponent implements OnInit {

b="xyz"
c=false
x:any //contais record of super user of typed name
route=""
c1=false //used for displaying invalid credentials
superuse: Superclass = new Superclass();
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
  getData(superuser: Superclass){
    this.superuse.name=this.SName.value
    this.superuse.password=this.SPass.value
    this.caseService.SuperUserDetails(this.superuse).subscribe((data=>{
      this.x=data;  
      this.caseService.set_Token(this.x.token)
      if(this.x!=null){
        this.caseService.set_LoginVariable("login")
        this.caseService.Suser=this.SName.value
        this.caseService.set_SuperUserName(this.SName.value)
        // this.route="/community"
        this.router.navigate(['/superCommon']);  //---change 22 dec 
        this.c=true
      }
      else{
        this.c=false
      }
    } ));  
    if(this.x==null){
      this.c1=true
      console.log(this.c1);
    }
    else{
      this.c1=false
    }
    
    
  }
showData() {
    console.log(this.SName.value)
    console.log( "classs namee",this.superuse.name);
    console.log("data from data base",this.x);
    
       
    }
    constructor(private http:HttpClient,private caseService:CaseDataService,private router: Router){
      
    }
    ngOnInit(){
      
    }
}
