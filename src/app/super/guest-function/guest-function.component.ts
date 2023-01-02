import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CaseDataService } from 'src/app/case-data.service';

@Component({
  selector: 'app-guest-function',
  templateUrl: './guest-function.component.html',
  styleUrls: ['./guest-function.component.css']
})
export class GuestFunctionComponent implements OnInit {
adminCommunityId:any
x:any
a1=false
y:any
a2=false
displayedColumns: String[]=['position1','position2','position3','position4','position5','position6','position7','position8'];
displayedColumns2: String[]=['position1','position2','position3','position4','position5','position6','position7'];
  constructor(private serv : CaseDataService,private http:HttpClient) {
    this.adminCommunityId= this.serv.communityId
    console.log(this.adminCommunityId);
    this.serv.GetGuestRoomsByCommunityId(this.adminCommunityId).subscribe((data=>{
     console.log(data);
     this.x=data
    
    console.log(this.serv.Suser);
    
    } ))
    console.log("hii");
    
    let reps=this.http.get("http://localhost:2022/case/functionHalls/"+this.adminCommunityId).subscribe((data=>{
      this.y=data
      console.log(this.y);
      
    }))
   }
   addGuestRoom(){
    let resp= this.http.post("http://localhost:2022/case/guestRooms/put",this.GuestForm.value).subscribe((data=>{
      console.log(data);
      
    }))
   }
   addFunctionHall(){
    let resp= this.http.post("http://localhost:2022/case/functionHalls/put",this.FunctionForm.value).subscribe((data=>{
      console.log(data);
      
    }))
   }
   GuestForm=new FormGroup({
    id:new FormControl(),
    roomName:new FormControl(),
    attachedWashRoom:new FormControl(),
    rentPerDay:new FormControl(''),
    bed:new FormControl(),
    createdBy:new FormControl(this.serv.Suser),
    communityId:new FormControl(this.serv.communityId),
    createdDate:new FormControl()
  })
  FunctionForm=new FormGroup({
    id:new FormControl(),
    capacity:new FormControl(),
    communityId:new FormControl(this.serv.communityId),
    createdBy:new FormControl(this.serv.Suser),
    createdDate:new FormControl(),
    rentPerDay:new FormControl(),
    roomName:new FormControl(),
  })
  get ID() {
    return this.GuestForm.get('id')!;
  }
  get SQFT() {
  return this.GuestForm.get('roomName')!;
  }
  get COMID() {
    return this.GuestForm.get('attachedWashRoom')!;
  }
  get FLATNO() {
    return this.GuestForm.get('rentPerDay')!;
  }
  get ROOMS(){
     return this.GuestForm.get('bed')!;
   }
   get UDT(){
    return this.GuestForm.get('createdBy')!;
  }
  get CBY(){
    return this.GuestForm.get('communityId')!;
  }
  get CDT(){
    return this.GuestForm.get('createdDate')!;
  }
  //==================================== getters of functionHallForm starts from here
  get ID1() {
    return this.GuestForm.get('id')!;
  }
  get SQF1T() {
  return this.GuestForm.get('capacity')!;
  }
  get COMI1D() {
    return this.GuestForm.get('communityId')!;
  }
  get FLATN1O() {
    return this.GuestForm.get('createdBy')!;
  }
  get ROOMS1(){
     return this.GuestForm.get('createdDate')!;
   }
   get UDT1(){
    return this.GuestForm.get('rentPerDay')!;
  }
  get CBY1(){
    return this.GuestForm.get('roomNmae')!;
  }
  ngOnInit(): void {
  }
  showData1(){
    if(this.a1==false){
     this.a1=true
    }
    else{
     this.a1=false
    }
   }
   showData2(){
    if(this.a2==false){
      this.a2=true
     }
     else{
      this.a2=false
     }
   }
}
