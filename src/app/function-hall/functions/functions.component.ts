import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CaseDataService } from 'src/app/case-data.service';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {
filteredOptions!:Observable<string[]>
x5:any //used for filtering functionhall names
type="Function Hall"
tenantRole=""
tenantFlatId:any
tenantCommunityId:any
tenantName:any
x:any //contains all function halls of a particular community
y:any // contails all function hall details by given flat id
approveCondition:any
dialog=false
x1:any
y1:any
y2:any=[]
a=false
b1=false
b=false
z:any
funtionHAllNumbers:any=[]
approved="Approved"
dateClash:any
varr="Show Booking Details"
  allCommunitiesOfOneManager: any;
  temp: any;
  dict2: any={};
  dynamicCommunityName: any;
  j: any;
  communityName:any
  topNavigate=false
  dataSource!:MatTableDataSource<any>
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator
currDate=formatDate(new Date(),'yyyy-MM-dd','en_US');
@ViewChild(FormGroupDirective) myForm:any;
functionHallColumns: String[]=['id','roomName','capacity','rentPerDay']
bookingColumns: String[]=['id','roomName','fromDate','toDate','type','createdBy','createdDate','approvedByManager','approve','reject']
  constructor(private servGR:CaseDataService,private http:HttpClient,private route : Router) { 
    this.tenantFlatId=parseInt(this.servGR.get_TenantFlatId()!)
    this.tenantName=this.servGR.get_TenantName1()
    this.communityName=this.servGR.get_CommunityName()
    if(this.servGR.get_tenantRole()=="communityManager"){ //checks if the logged in tenant is a community manager or not
      if(parseInt(this.servGR.get_ComIdFromManager()!)==0){ // if CM is not from different communities
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
    }
    else{ // if he is not a community manager
      this.tenantCommunityId=JSON.parse(this.servGR.get_CommunitiesOfManagers()!)[0]
    }
    this.tenantRole=this.servGR.get_tenantRole()!
    this.servGR.GetGuestRoomsByCommunityIdF(this.tenantCommunityId).subscribe(((data:any)=>{
     //console.log(data);
     this.dataSource=new MatTableDataSource(data)
        this.dataSource.paginator=this.paginator
        this.dataSource.sort=this.matSort
     this.x=data;
     this.x5=data
     this.x.forEach((val:any) => {
      this.funtionHAllNumbers.push(val.roomName)
     });
    } ))
  }
  bookRooms(){
  document.getElementById('form')?.scrollIntoView({behavior:'smooth'})
    if(this.dialog==false){
    this.dialog=true
    }
    this.BookingForm.setValue({
      flatId: this.tenantFlatId,
      type: "Function Hall",
      roomName: null,
      fromDate: this.currDate,
      toDate: this.currDate,
      approvedByManager: "pending",
      comments: null,
      createdBy: this.servGR.get_TenantEmail(),
      createdDate: null,
      updatedBy: null,
      updatedDate: null
    })
  }
  BookingForm=new FormGroup({
    // id:new FormControl(),
    flatId:new FormControl(),
    type:new FormControl("Function Hall"),
    roomName:new FormControl('',[Validators.required,this.noSpaceAllowed(this.funtionHAllNumbers)]),
    fromDate:new FormControl(this.currDate,Validators.required),
    toDate:new FormControl(this.currDate,Validators.required),
    approvedByManager:new FormControl(''),
    comments:new FormControl(''),
    createdBy:new FormControl(''),
    createdDate:new FormControl(),
    updatedBy:new FormControl(''),
    updatedDate:new FormControl()
  })
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
    
    let resp=this.http.post(this.servGR.url27+this.BookingForm.get('roomName')!.value+'/'+this.approved,this.BookingForm.value).
    subscribe((data=>{
      this.dateClash=data
      if(this.dateClash==null){
        alert("Succesfull Booked")
        this.BookingForm.setValue({
          flatId: this.tenantFlatId,
          type: "Function Hall",
          roomName: this.currDate,
          fromDate: this.currDate,
          toDate: null,
          approvedByManager: "pending",
          comments: null,
          createdBy: this.servGR.get_TenantEmail(),
          createdDate: null,
          updatedBy: null,
          updatedDate: null
        })
        this.myForm.resetForm()
        this.dialog=false
        this.ngOnInit()
      }
      else if(this.dateClash[1]==null){
        alert("Duplicate request")
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
     
  }
  approve(x:any,y:any){
    console.log("jjjjjjjjj",x);
    this.servGR.UpdateBookingStatusForGuestRoomsF(x,y).subscribe((data=>{
     console.log(data);
   alert("Succesfully Updated")
   this.ngOnInit()
  }))
  }
  roomDetails(x:any){
    
      if(this.z[0]==null){
        this.b=false
      }
      else{
        this.b=true
      }
  }
  closeDialog(){
    document.getElementById('head')?.scrollIntoView({behavior:'smooth'})
    if(this.dialog==true){
      this.dialog=false
    }
   
    this.myForm.resetForm()
    console.log(this.BookingForm.value);
    
   
  }
  noSpaceAllowed(val: any): ValidatorFn {
 
    return (control: AbstractControl): ValidationErrors | null => {
      if(val.indexOf(control.value)==-1){
        return {noSpaceAllowed:false}
      } 
      return null;
    }
  }
   filterData($event:any){
    this.dataSource.filter=$event.target.value
   }
  ngOnInit(): void {
    if(this.tenantRole=="communityManager"){
      this.approveCondition=true
    }
    else{
      this.approveCondition=false
    }
    this.BookingForm.setValue({
      flatId: this.tenantFlatId,
      type: "Function Hall",
      roomName: null,
      fromDate: this.currDate,
      toDate: this.currDate,
      approvedByManager: "pending",
      comments: null,
      createdBy: this.tenantName,
      createdDate: null,
      updatedBy: null,
      updatedDate: null
    })
    if(this.tenantRole=="tenant"){
      console.log("1235");
      
      this.servGR.GetBookingsByFlatIdAndTypeF(this.tenantFlatId,this.type,this.servGR.get_TenantEmail()).subscribe((data=>{
        this.y=data
      }))
    }
    else{
      this.servGR.GetAllBookingDetailsByTypeAndCommunityId(this.type,this.tenantCommunityId).subscribe((data=>{
        this.y=data
     
       }))
    }
    this.BookingForm.get('roomName')?.valueChanges.subscribe((res)=>{
      this.filterData2(res);
    })
  }
  filterData2(res:any){
    this.x = this.x5.filter((item:any)=>{
      return item.roomName.toLowerCase().indexOf(res)>-1
    })
  }

}
