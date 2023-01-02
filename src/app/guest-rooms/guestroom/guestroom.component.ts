import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators,ValidatorFn, FormGroupDirective} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LogarithmicScale } from 'chart.js';
import { map, Observable, startWith } from 'rxjs';
import { CaseDataService } from 'src/app/case-data.service';

@Component({
  selector: 'app-guestroom',
  templateUrl: './guestroom.component.html',
  styleUrls: ['./guestroom.component.css']
})
export class GuestroomComponent implements OnInit {
myControl = new FormControl('');
// filteredOptions:Observable<string[]>
type="Guest Room"
tenantRole=""
tenantFlatId:any
tenantCommunityId:any
approveCondition:any
x:any //contains all guest rooms of a particular community
y:any // contails all booking details by given flat id
guestRoomNames:any=[]
dialog:any
a=false
b=false
b1=false
x1:any
y1:any
y2:any=[]
selectedRoom:any
z:any
z1:any //contains flats fetched by a community id 
approved="Approved"
dict:any={}
dateClash:any // \contains an array of dates in which the booked dates are clashing
varr="Show Booking Details"
  dynamicCommunityName: any;
  j: any;
  allCommunitiesOfOneManager: any;
  temp: any;
  dict2: any={};
  communityName:any
  topNavigate=false
  currDate=formatDate(new Date(),'yyyy-MM-dd','en_US');
@ViewChild(FormGroupDirective) myForm:any;
dataSource!:MatTableDataSource<any>
@ViewChild(MatSort) matSort!: MatSort;
@ViewChild('paginator') paginator!: MatPaginator
guestRoomColumns: String[]=['id','roomName','attachedWashRoom','bed','rentPerDay']
bookingColumns: String[]=['id','roomName','fromDate','toDate','type','createdBy','createdDate','approvedByManager','approve','reject']
  constructor(private servGR:CaseDataService,private http:HttpClient,private route:Router) {
    this.tenantFlatId=parseInt(this.servGR.get_TenantFlatId()!)
    this.tenantRole=this.servGR.get_tenantRole()!
    this.communityName=this.servGR.get_CommunityName()
    if(this.servGR.get_tenantRole()=="communityManager"){ //checks if the logged in tenant is a community manager or not
      if(parseInt(this.servGR.get_ComIdFromManager()!)==0){ // if CM is not from different communities
        console.log("yoo");
        
        this.tenantCommunityId=JSON.parse(this.servGR.get_CommunitiesOfManagers()!)[0]
      } 
      else{   // if CM is from different communities
        this.topNavigate=true
        this.tenantCommunityId=parseInt(this.servGR.get_ComIdFromManager()!)
        this.allCommunitiesOfOneManager=JSON.parse(this.servGR.get_CommunitiesOfManagers()!)
        this.tenantRole=this.servGR.get_tenantRole()!
    this.allCommunitiesOfOneManager.forEach((val:any) => {
      this.servGR.GetCommunitiesById(val).subscribe((data=>{
        this.temp=data
        this.dict2[this.temp[0].id]=this.temp[0].communityName
      }))
    }); 
      }
    }
    else if(this.servGR.get_tenantRole()!="communityManager" && parseInt(this.servGR.get_ComIdFromManager()!)!=0){
      this.topNavigate=true
      this.tenantCommunityId=parseInt(this.servGR.get_ComIdFromManager()!)
      this.allCommunitiesOfOneManager=JSON.parse(this.servGR.get_CommunitiesOfManagers()!)
       //below code gets all community details and stores names and ids in a dictionary 
  this.allCommunitiesOfOneManager.forEach((val:any) => {
    this.servGR.GetCommunitiesById(val).subscribe((data=>{
      this.temp=data
      this.dict2[this.temp[0].id]=this.temp[0].communityName
    }))
  });
  console.log("netra",this.dict);
    }
    else{ // if he is not a community manager
      this.tenantCommunityId=JSON.parse(this.servGR.get_CommunitiesOfManagers()!)[0]
    }
    
    this.servGR.GetGuestRoomsByCommunityId(this.tenantCommunityId).subscribe(((data:any)=>{
      console.log(data);
      this.dataSource=new MatTableDataSource(data)
        this.dataSource.paginator=this.paginator
        this.dataSource.sort=this.matSort
     this.x=data
     this.x.forEach((val:any) => {
      this.guestRoomNames.push(val.roomName)
    });
    } ))    
    if(this.tenantRole=="communityManager"){
      this.approveCondition=true
    }
    else{
      this.approveCondition=false
    }
    }

  BookingForm=new FormGroup({
    // id:new FormControl(),
    flatId:new FormControl(),
    type:new FormControl("Guest Room"),
    roomName:new FormControl('',[Validators.required,this.noSpaceAllowed(this.guestRoomNames)]),
    fromDate:new FormControl(this.currDate,Validators.required),
    toDate:new FormControl(this.currDate,Validators.required),
    approvedByManager:new FormControl(''),
    comments:new FormControl(''),
    createdBy:new FormControl(''),
    createdDate:new FormControl(),
    updatedBy:new FormControl(''),
    updatedDate:new FormControl()
  })
  // noSpaceAllowed(control: AbstractControl): ValidationErrors | null {
  //   if(this.guestRoomNames.indexOf(control.value)!=-1){
  //     return {noSpaceAllowed:false}
  //   }
  //   else{
  //     return {noSpaceAllowed:true}
  //   }
  // }
  noSpaceAllowed(val: any): ValidatorFn {
 
    return (control: AbstractControl): ValidationErrors | null => {
      if(val.indexOf(control.value)==-1){
        return {noSpaceAllowed:false}
      } 
      return null;
    }
  }
 
  get ID() {
    return this.BookingForm.get('id')!;
  }
  get FLATID() {
    return this.BookingForm.get('flatId')!;
  }
  get TYPE() {
    return this.BookingForm.get('type')!;
  }
  get ROOMNAME() {
    return this.BookingForm.get('roomName')!;
  }
  get FROMDATE() {
    return this.BookingForm.get('fromDate')!;
  }
  get TODATE() {
    return this.BookingForm.get('toDate')!;
  }
  get APPROVEDBYMANAGER() {
    return this.BookingForm.get('approvedByManager')!;
  }
  get COMMENTS() {
    return this.BookingForm.get('comments')!;
  }
  get CREATEDBY() {
    return this.BookingForm.get('createdBy')!;
  }
  get CREATEDATE() {
    return this.BookingForm.get('createdDate')!;
  }
  get UPDATEDBY() {
    return this.BookingForm.get('updatedBy')!;
  }
  get UPDATEDDATE() {
    return this.BookingForm.get('updatedDate')!;
  }
  confirmBooking(){
    console.log(this.BookingForm.get('roomName')!.value);
    
    let resp=this.http.post("http://localhost:2022/case/putBooking1/"+this.BookingForm.get('roomName')!.value+'/'+this.approved,this.BookingForm.value).
    subscribe((data=>{
      this.dateClash=data
      if(this.dateClash==null){
        alert("Succesfull Booked")
        this.BookingForm.setValue({
          // id: undefined,
          flatId: this.tenantFlatId,
          type: "Guest Room",
          roomName: this.currDate,
          fromDate: this.currDate,
          toDate: null,
          approvedByManager: "pending",
          comments: null,
          createdBy: this.servGR.get_TenantName1(),
          createdDate: null,
          updatedBy: null,
          updatedDate: null
        })
        this.dialog=false
        this.myForm.resetForm()
        this.ngOnInit()
      }
      else{
        alert("room is already booked for dates"+ " "+this.dateClash)
      }
    }))
    
  }
  ShowBookingDetails(){
    if(this.varr=="Show Booking Details"){
      this.varr="Hide Details"
    }
    else{
      this.varr="Show Booking Details"
    }
    if(this.a==false){
      this.a=true
    }
    else{
      this.a=false
    }
    // console.log(this.tenantRole);
    // console.log(this.servGR.get_tenantRole());
  }
  approve(x:any,y:any){
    this.servGR.UpdateBookingStatusForGuestRooms(x,y).subscribe((data=>{
      console.log(data);
      let x:any=data
      alert("Succesfully Updated")
      this.ngOnInit()
    }))
    
  }
  BookRooms(){
     this.dialog=true 
     console.log(this.BookingForm.value);
     this.BookingForm.setValue({
      // id: undefined,
      flatId: this.tenantFlatId,
      type: "Guest Room",
      roomName: null,
      fromDate: this.currDate,
      toDate: this.currDate,
      approvedByManager: "pending",
      comments: null,
      createdBy: this.servGR.get_TenantName1(),
      createdDate: null,
      updatedBy: null,
      updatedDate: null
    })
     
  }
  closeDialog(){
    this.myForm.resetForm()
    this.dialog=false
  }
  // changeCommunity(x:any,y:any){
  //   this.servGR.set_ComIdFromManager(parseInt(x))
  //   this.servGR.set_CommunityName(y)
  //   this.dynamicCommunityName=y
  //   console.log("josh");
    
  //   let resp=this.http.get("http://localhost:2022/case/tenantsByComId/"+parseInt(x)+'/'+this.servGR.get_TenantName1()).
  //   subscribe((data=>{
  //     console.log("dataaa",data);
  //     this.j=data
  //     this.servGR.set_TenantFlatId(this.j[0].flatId) //when tenant details are fetched by name and com-id then original flat id is obtained
  //     location.reload()
  //   }))
  //  }
   filterData($event:any){
    this.dataSource.filter=$event.target.value
   }
  ngOnInit(): void {  
    //=========================================================---Booking details all fetched from below code
    if(this.tenantRole=="tenant"){
      this.servGR.GetFlatsByCommunityId(this.tenantCommunityId).subscribe((data=>{
        if(data!=null){
          this.servGR.GetBookingsByFlatIdAndType(this.tenantFlatId,this.type,this.servGR.get_TenantName1()).subscribe((data=>{
            // console.log(data);
            this.y=data
          }))
        }
      }))
  }
  else{
    this.servGR.GetAllBookingDetailsByTypeAndCommunityId(this.type,this.tenantCommunityId).subscribe((data=>{
      // console.log(this.type);
      this.y=data
    //  console.log(this.y);
    //   this.y2=[]
    //   this.y.forEach((val:any) => {
    //     this.servGR.GetFlatsById(val.flatId).subscribe((data=>{
    //       this.y1=data
    //       // console.log(this.y1[0].communityId);
    //       // console.log(this.servGR.get_ComIdFromManager());
    //       if(parseInt(this.servGR.get_ComIdFromManager()!)!=0){
            
    //       if(this.y1[0].communityId==parseInt(this.servGR.get_ComIdFromManager()!)){
    //         this.y2.push(val)
    //       }
    //     }
    //       else{
            
    //         if(this.y1[0].communityId==JSON.parse(this.servGR.get_CommunitiesOfManagers()!)[0]){
    //           this.y2.push(val)
    //         }
    //       }
        
    //     }))
    //   });
      
    //   this.y=this.y2
    //      console.log("josh",this.y);
     }))
  }   
  this.BookingForm.setValue({
    // id: undefined,
    flatId: this.tenantFlatId,
    type: "Guest Room",
    roomName: null,
    fromDate: this.currDate,
    toDate: this.currDate,
    approvedByManager: "pending",
    comments: null,
    createdBy: this.servGR.get_TenantName1(),
    createdDate: null,
    updatedBy: null,
    updatedDate: null
  })
  // this.filteredOptions = this.myControl.valueChanges.pipe(
  //   startWith(''),
  //   map((value: any) => this._filter(value || '')),
  // );
  }  
  // private _filter(value: string): string[] {
  //   console.log(value);
    
  //   const filterValue = value.toLowerCase();
  //   return this.x.roomName.filter((option: any) => option.toLowerCase().includes(filterValue));
  // }
}

