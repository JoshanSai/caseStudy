import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseDataService } from 'src/app/case-data.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {

  comID=0
  x:any // contains all flats by community id
  y:any
  n=0
  updatingFlatId:any
  addUpdate=true // used to change button when add is clicked and when update is clicked
  comName:any
  newX:any = [] // this array contains tenants of a particular community
  newY:any // just converting the above array to object 
  a1=false
  a2=false
  dict:any={}
  dict2:any={} // contains flat numbers vs flat ids
  x1:any //contains all communities of admin name
  addUpdate2=false
  addUpdate3=false
  tenantFormFlatId:any //used to convert the flat id frm string to integer 
  displayedColumns: String[]=['no','flatNumber','numberOfRooms','Sqft','update'];
  tenantColumns: String[]=['no','flatId','personName','update'];
   @ViewChild(FormGroupDirective) myForm:any;
  // dataSource1!:MatTableDataSource<any>
  dataSource2!:MatTableDataSource<any>
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild('tenantSort') tenantSort!: MatSort;
  // @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorTenant') paginator2!: MatPaginator;
    constructor(private caseService2 : CaseDataService,private http:HttpClient, private route: ActivatedRoute,private router : Router) { 
     
    }
  // flatForm=new FormGroup({
  //   id:new FormControl(),
  //   Sqft:new FormControl(null,Validators.required),
  //   communityId:new FormControl(this.comID),
  //   flatNumber:new FormControl('',Validators.required),
  //   numberOfRooms:new FormControl(null,Validators.required),
  //   updatedDate:new FormControl(),
  //   createdBy:new FormControl(this.caseService2.get_SuperUserName(),),
  //   createdDate:new FormControl()
  // })
  // closeFlatForm(){
  //   this.flatForm.reset()
  //   this.a1=false
  // }
  // get ID() {
  //   return this.flatForm.get('id')!;
  // }
  // get SQFT() {
  // return this.flatForm.get('Sqft')!;
  // }
  // get COMID() {
  //   return this.flatForm.get('communityId')!;
  // }
  // get FLATNO() {
  //   return this.flatForm.get('flatNumber')!;
  // }
  // get ROOMS(){
  //    return this.flatForm.get('numberOfRooms')!;
  //  }
  //  get UDT(){
  //   return this.flatForm.get('updatedDate')!;
  // }
  // get CBY(){
  //   return this.flatForm.get('createdBy')!;
  // }
  // get CDT(){
  //   return this.flatForm.get('createdDate')!;
  // }
  // showData1(){
  //   this.addUpdate=true
  //  if(this.a1==false){
  //   this.a1=true
  //  }
  //  else{
  //   this.a1=false
  //  }
  //  this.flatForm.setValue({
  //   id:null,
  //   communityId: this.comID,
  //   Sqft: null,
  //   flatNumber: null,
  //   numberOfRooms: null,
  //   updatedDate: null,
  //   createdBy: this.caseService2.get_SuperUserName(),
  //   createdDate: null
  // })
  // }
  showData2(){
    this.tenantsForm.reset();
    // this.tenantsForm.resetForm();
    this.addUpdate2=true
    this.addUpdate3=false
    if(this.a2==false){
     this.a2=true
    }
    else{
     this.a2=false
    }
    console.log('this.tenantsform>>', this.tenantsForm);
    this.tenantsForm.setValue({
      id:null,
      flatId: null,
      personName: null,
      phoneNumber: null,
      email: null,
      password: null,
      memberSince: null,
      adminStartDate: null,
      adminEndDate: null,
      createdBy: this.caseService2.get_SuperUserName(),
      createdDate: null
    })
   }
  tenantsForm=new FormGroup({
    id:new FormControl(),
    flatId:new FormControl(null,[Validators.required]),
    personName:new FormControl('',Validators.required),
    phoneNumber:new FormControl(1),
    email:new FormControl(''),
    password:new FormControl('',Validators.required),
    memberSince:new FormControl(''),
    adminStartDate:new FormControl(),
    adminEndDate:new FormControl(),
    createdBy:new FormControl(),
    createdDate:new FormControl()
  
  })
  closeTenantFrom(){
    // this.tenantsForm.setValue({
    //   id: null,
    //   flatId: null,
    //   personName: null,
    //   phoneNumber: null,
    //   email: null,
    //   password: null,
    //   memberSince: null,
    //   adminStartDate: null,
    //   adminEndDate: null,
    //   createdBy: null,
    //   createdDate: null
    // })
  // this.tenantsForm.reset()
  this.myForm.resetForm()
    this.a2=false
   console.log("closed");
   
  }
  get TID(){
    return this.tenantsForm.get('id');
  }
  get TFLATID(){
    return this.tenantsForm.get('flatId');
  }
  get TpersonName(){
    return this.tenantsForm.get('personName');
  }
  get TphoneNumber(){
    return this.tenantsForm.get('phoneNumber');
  }
  get Temail(){
    return this.tenantsForm.get('email');
  }
  get Tpassword(){
    return this.tenantsForm.get('password');
  }
  get TmemberSince(){
    return this.tenantsForm.get('memberSince');
  }
  get TadminStartDate(){
    return this.tenantsForm.get('adminStartDate');
  }
  get TadminEndDate(){
    return this.tenantsForm.get('adminEndDate');
  }
  get createdBY(){
    return this.tenantsForm.get('createdBy');
  }
  get createdDATE(){
    return this.tenantsForm.get('createdDate');
  }
  
  // addFlat(){
    
  //   this.caseService2.InsertNewFlats(this.flatForm.value).toPromise().then(data=>{
  //     console.log("1111",data);
  //     if(data==null){
  //       alert("flat number already exits")
  //     }
  //     else{
  //       alert("Successfull added")
  //       window.location.reload()
  //     }
  //    })
  //    console.log(this.flatForm.value); 
  // }
  addTenants(){
    console.log("TENANT FORM",this.tenantsForm.value);
      this.caseService2.InsertNewTenants(this.comID,this.tenantsForm.value).subscribe(data=>{
        console.log("222222",data);
        if(data==null){
          alert("name already exists")
        }
        else{
          alert("sucessfully added")
          this.closeTenantFrom()
          this.ngOnInit()
        }
       })
    }
    // updateFlat(id:any,flatNumber:any,numberOfRooms:any,Sqft:any){
    //   this.a1=true
    //   this.addUpdate=false
    //   this.flatForm.setValue({
    //     id:id,
    //     communityId: this.comID,
    //     Sqft: Sqft,
    //     flatNumber: flatNumber,
    //     numberOfRooms: numberOfRooms,
    //     updatedDate: null,
    //     createdBy: this.caseService2.get_SuperUserName(),
    //     createdDate: null
    //   })
    //   this.updatingFlatId=id
      
    // }
    updateTenant(id:any,flatid:any,phoneNumber:any,email:any,password:any,memberSince:any
      ,adminStartDate:any,adminEndDate:any,personaname:any){
        this.tenantsForm.setValue({
              id:id,
              flatId: flatid,
              personName: personaname,
              phoneNumber: phoneNumber,
              email: email,
              password:"password",
              memberSince: memberSince,
              adminStartDate: adminStartDate,
              adminEndDate: adminEndDate,
              createdBy: this.caseService2.get_SuperUserName(),
              createdDate: null
            }) 
        this.addUpdate3=true
        this.addUpdate2=false
      this.a2=true
      console.log(this.tenantsForm.value);
      
    }
    // updateFlatAfterClicked(){
    //   this.a2=true
    //   let resp=this.http.put("http://localhost:2022/case/updateFlats/"+this.updatingFlatId+'/',this.flatForm.value).subscribe((data=>{
    //     if(data!=null){
    //       alert("successfully updated")
    //       window.location.reload()
    //     }
        
    //   }))
    // }
    updateTenantAfterClicked(){
      console.log(this.tenantsForm.value);
      let resp = this.http.put("http://localhost:2022/case/updateTenants/"+this.tenantsForm.get('id')?.value,this.tenantsForm.value)
      .subscribe((data=>{
        if(data!=null){
       alert("Successfully updated")
       this.closeTenantFrom()
       this.ngOnInit()
        }
        else{
          alert("unable to update")
        }
      }))
    }
    // filterData($event :any){
    //   this.dataSource1.filter=$event.target.value;
    // }
    filterData2($event :any){
      this.dataSource2.filter=$event.target.value;
    }
    ngOnInit(): void {
      // this.flatForm.setValue({
      //   id:null,
      //   communityId: this.comID,
      //   Sqft: null,
      //   flatNumber: null,
      //   numberOfRooms: null,
      //   updatedDate: null,
      //   createdBy: this.caseService2.get_SuperUserName(),
      //   createdDate: null
      // })
      this.tenantsForm.setValue({
        id:null,
        flatId: null,
        personName: null,
        phoneNumber: null,
        email: null,
        password: null,
        memberSince: null,
        adminStartDate: null,
        adminEndDate: null,
        createdBy: this.caseService2.get_SuperUserName(),
        createdDate: null
      })
     //============================================main code is below
     this.comName=this.caseService2.get_ComNameFromAdmin()
     this.comID=parseInt(this.caseService2.get_ComIdFromAdmin()!)
   this.caseService2.GetFlatsByCommunityId(this.comID).subscribe(((data:any)=>{
        this.x=data;
        this.x.forEach((val:any) => {
          this.caseService2.GetFlatsById(val.id).subscribe((data=>{
            let x:any=data
            this.dict2[x[0].id]=x[0].flatNumber
          }))
        });
        console.log("flats vs flat num",this.dict2); 
      } ));
    this.caseService2.GetTenantsByCommunityId(this.comID).subscribe(((data:any)=>{
      this.newY=data;
      this.dataSource2=new MatTableDataSource(data)
      this.dataSource2.paginator=this.paginator2
      this.dataSource2.sort=this.tenantSort
    })) 
    }
  
  }
  function output() {
    throw new Error('Function not implemented.');
  }
  
  