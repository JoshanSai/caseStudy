import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit,Output,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { z } from 'chart.js/dist/chunks/helpers.core';
import { CaseDataService } from 'src/app/case-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
Suser=""
x:any
y1: any
a:any
c=0
dialog=false
dataSource!:MatTableDataSource<any>
@ViewChild(MatSort) matSort!: MatSort;
@ViewChild('paginator') paginator!: MatPaginator
z:any={} //contains number of community managers for each community 
@ViewChild(FormGroupDirective) myForm:any;
addBtn=false
updateBtn=false
currDate=formatDate(new Date(),'yyyy-MM-dd','en_US');
displayedColumns: String[]=['id','communityName','communityAddress','registeredDate','z','position6','position7'];
@Output()
notify:EventEmitter<any>=new EventEmitter<any>();
  constructor(private http:HttpClient,private caseService1:CaseDataService, private router: Router,private route:ActivatedRoute) {
    
   }
   communityForm=new FormGroup({
    id:new FormControl(),
    communityName:new FormControl('',Validators.required),
    communityAddress:new FormControl('',Validators.required),
    registeredDate:new FormControl('',Validators.required),
    updatedBy:new FormControl(),
    updatedDate:new FormControl(),
    createdBy:new FormControl(''),
    createdDate:new FormControl()
  })
   
   sendId(x:number,y:string){
    this.caseService1.communityId=x
    this.caseService1.communityName=y
    this.caseService1.set_ComIdFromAdmin(x)
    this.caseService1.set_ComNameFromAdmin(y)
    this.router.navigate(['/superCommon/navBar', x]);
    this.notify.emit(this.caseService1.get_ComNameFromAdmin()!)
   }
   
   closeCommunityFrom(){
    this.dialog=false
    this.myForm.reset()
    this.ngOnInit()
   }
   openCommunityForm(){
    this.dialog=true
    this.addBtn=true
    this.updateBtn=false
    this.communityForm.setValue({
      id: null,
      communityName: null,
      communityAddress: null,
      registeredDate: this.currDate,
      updatedBy: null,
      updatedDate: null,
      createdBy: this.Suser,
      createdDate: null
    })
   }
   updateFormOpen(id:any,name:any,address:any,date:any){
    console.log(id,name,address,date);
    
    this.dialog=true
    this.addBtn=false
    this.updateBtn=true
    this.communityForm.setValue({
      id: id,
      communityName: name,
      communityAddress: address,
      registeredDate: date,
      updatedBy: null,
      updatedDate: null,
      createdBy: this.Suser,
      createdDate: null
    }) 
   }
   updateAfterClick(){
    let resp=this.http
    .put("http://localhost:2030/case/updateCommunity/"+this.communityForm.get('id')?.value,this.communityForm.value)
   .subscribe((data=>{
    if(data!=null){
      alert("Succesfully updated")
    }
    else{
      alert("unable to update")
    }
   }))
  }
   addCommunity(){
    console.log(this.communityForm.value);
    let resp=this.http.post("http://localhost:2030/case/putCommunities",this.communityForm.value)
    .subscribe((data=>{
      if(data==null){
        alert("community name already exits")
      }
      else{
        alert("Succesfully added")
      }
    }))
   }
  filterData($event:any){
    this.dataSource.filter=$event.target.value
   }
  ngOnInit(): void {
    this.communityForm.setValue({
      id: null,
      communityName: null,
      communityAddress: null,
      registeredDate: null,
      updatedBy: null,
      updatedDate: null,
      createdBy: this.Suser,
      createdDate: null
    })
    //============================main code is below
    this.Suser=this.caseService1.get_SuperUserName()!
      this.caseService1.GetCommunityByCreatorName(this.Suser).subscribe((data:any)=>{
        this.dataSource=new MatTableDataSource(data)
        this.dataSource.paginator=this.paginator
        this.dataSource.sort=this.matSort
        this.x = data;
        this.x.forEach((val:any) => {
          
          let resp=this.http.get("http://localhost:2030/case/managersByComId/"+val.id).subscribe((data=>{
            let y:any=data
            this.c=0
            y.forEach((val:any) => {
              console.log(val);
              
             this.c=this.c+1
            });
            this.z[val.id]=this.c
        }))
        });
      } ); 
  }
  get(){
    
    console.log(this.a);
  }  
  

}

