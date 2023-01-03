import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { CaseDataService } from 'src/app/case-data.service';
import { Tenantclass } from 'src/app/tenantclass';
import { DatePipe, formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-community-manager',
  templateUrl: './community-manager.component.html',
  styleUrls: ['./community-manager.component.css']
})
export class CommunityManagerComponent implements OnInit {



  ngOnInit(): void {
  }
a=false
b=""
c=false
c1=0
c3=false
link="/dashBoard"
x1:any // contains list of tenants with typed name along with token
x:any // this contains list of tenats which are fetched by typed name
y:any
z:any=[] //contains list of communities of particular community manager
obj:Tenantclass=new Tenantclass();
date:any
communityIds:any=[]
userForm = new FormGroup( {
    Cname: new FormControl(""),
    Cpass: new FormControl(""),
  })
get CName() {
    return this.userForm.get('Cname')!;
  }
  get CPass() {
 return this.userForm.get('Cpass')!;
  }
  getData(obj1:Tenantclass){
    this.obj.name=this.CName.value        
    this.obj.password=this.CPass.value
    console.log(obj1.name);
    this.serv.set_TenantName1(this.CName.value)
    this.serv.GetTenantsByName(obj1).subscribe((data=>{
      this.x1=data
     this.x=this.x1.user 
      // this.x=data; 
       this.serv.set_Token(this.x1.token)
      this.serv.set_TenantFlatId(this.x[0].flatId)
      //below code is responsible to determine the role of tenant upto line 67
      if(this.x[0].adminStartDate!=null && this.x[0].adminEndDate==null){ 
        this.serv.set_tenantRole("communityManager")
      }
      else if(this.x[0].adminStartDate!=null && this.x[0].adminEndDate!=null){
        this.date = formatDate(new Date(),'yyyy-MM-dd','en_US');
        let date2 = formatDate(this.x[0].adminEndDate,'yyyy-MM-dd','en_US');
        if(this.date<date2){
          this.serv.tenantRole="communityManager"
          this.serv.set_tenantRole("communityManager")
         }else{
          this.serv.tenantRole="tenant"
          this.serv.set_tenantRole("tenant")
         }
      }
      else{
        this.serv.tenantRole="tenant"
        this.serv.set_tenantRole("tenant")
      }
      //below code is responsible to get communities of single manager 
      if(this.x[0]!=null){  
        this.c=true 
      this.x.forEach((val:any)=>{
        this.c1=this.c1+1
        console.log("val", val.community.id);
        this.communityIds.push(val.community.id)
        this.serv.GetCommunitiesById(val.community.id).subscribe((data)=>{
          this.z.push(data)
        })
      })
      }
      if(this.c && this.c1<=1){
        this.serv.set_LoginVariable("login")
        this.serv.GetCommunitiesById(this.communityIds[0]).subscribe((data=>{
          let x:any=data 
          this.serv.set_CommunityName(x[0].communityName)
          this.router.navigate(['/tenantCommon']);
          this.serv.set_ComIdFromManager(0)
        }))
       
      }
      else if(this.c && this.c1>1){
        this.serv.set_LoginVariable("login")
        this.router.navigate(['/chooseCommunity']);
      }
      this.serv.communitiesOfManagers=this.communityIds
      this.serv.set_CommunitiesOfManagers(this.communityIds) //session
    //   this.serv.GetCommunitiesById(this.communityIds[0]).subscribe((data=>{
    //     let x:any=data
    //     this.serv.set_CommunityName(x[0].communityName)
    //   }))
    //  console.log("============",this.communityIds);
    } ));  
    // below code is responsible to show invalid credentials    
    if(this.x==null){
      this.c3=true
    }
    else{
      this.c3=false
    }
  }
  
  
showData() {
    console.log(this.CName.value)
    }
    constructor(private http:HttpClient,private serv: CaseDataService,private datePipe:DatePipe,private router:Router){
     
    }
}
