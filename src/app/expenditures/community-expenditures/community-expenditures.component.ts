
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Conditional, ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup,FormGroupDirective,ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {  window} from 'rxjs';
import { CaseDataService } from 'src/app/case-data.service';

@Component({
  selector: 'app-community-expenditures',
  templateUrl: './community-expenditures.component.html',
  styleUrls: ['./community-expenditures.component.css']
})
export class CommunityExpendituresComponent implements OnInit {
tenantRole=""
tenant:any
tenantName:any
tenantCommunityId:any
s: Number=0;
select:any=null
a=false
dialogs=false
months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
datecurr : Date=new Date();
monthInSingleNumber=(this.datecurr.getMonth()+1).toString() // if january, it is 1 
month=String(this.monthInSingleNumber).padStart(2, '0')   // converts above variable to "01"
monthName=this.months[parseInt(this.month)-1]
currYear=this.datecurr.getFullYear()
y:any=[] //contains all expenses of a particular community for current month
x:any // contains all expenses of a particular community
z:any
flatNumbers:any=[]
revFlatNumbers:any
communityName=''
set:any=[]
c=0
dict:any={};
flatIds:any=[]
opt:any
t:any
updateCondition=false
updateCondition1=false
uID:any //update id = this will contain id of an expense
uFLATID:any //update flat id = this will contain flat id of an expense
uAMOUNT:any
uTRANSACTIONDATE:any
uTYPE:any
error=false
allCommunitiesOfOneManager: any;
temp: any;
dynamicCommunityName: any;
dict2: any={}; //for changing to other community
j: any
dict3:any={} // for displaying flat numbers in table
topNavigate=false
@ViewChild(FormGroupDirective) myForm:any;
update_condition=false
dataSource!:MatTableDataSource<any>
@ViewChild(MatSort) matSort!: MatSort;
@ViewChild('paginator') paginator!: MatPaginator
currDate=formatDate(new Date(),'yyyy-MM-dd','en_US');
ExpensesColumns: String[]=['id','amount','comments','createdBy','flatId','transactionDate','type','btn']
fromDate:any
toDate:any
  constructor(private serv3 : CaseDataService,private http:HttpClient,private route:Router) { 
    this.communityName=this.serv3.get_CommunityName()!
    this.tenantRole=this.serv3.get_tenantRole()!
    this.tenantName=this.serv3.get_TenantName1()
    console.log(this.serv3.tenantRole);
    console.log("byee",this.tenantRole);
    this.tenant=this.serv3.get_TenantName1()
}
     appearDropDown(){
      this.updateCondition=true
      this.updateCondition1=false
    if(this.dialogs==false){
      this.dialogs=true
    }
    else{
      this.dialogs=false
    }
    this.ExpensesForm.setValue({
      // id: undefined,
      communityId: this.tenantCommunityId,
      flatId: null,
      type: null,
      amount: null,
      transactionDate: this.currDate,
      references: null,
      comments: null,
      createdBy: this.tenantName,
      createdDate: null,
      updatedBy: null,
      updatedDate: null
    })

   }
   ExpensesForm=new FormGroup({
    // id:new FormControl(),
    communityId:new FormControl(),
    flatId:new FormControl('',[Validators.required]),
    type:new FormControl('',Validators.required),
    amount:new FormControl(null,Validators.required),
    transactionDate:new FormControl('',Validators.required),
    references:new FormControl(''),
    comments:new FormControl('',Validators.required),
    createdBy:new FormControl(''),
    createdDate:new FormControl(),
    updatedBy:new FormControl(''),
    updatedDate:new FormControl()
  })
  noSpaceAllowed(val: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(val.indexOf(control.value)==-1){
        return {noSpaceAllowed:false}
      } 
      return null;
    }
  }
  get ID() {
    return this.ExpensesForm.get('id')!;
  }
  get COMMUNITYID() {
    return this.ExpensesForm.get('communityId')!;
  }
  get FLATID() {
    return this.ExpensesForm.get('flatId')!;
  }
  get TYPE() {
    return this.ExpensesForm.get('type')!;
  }
  get AMOUNT() {
    return this.ExpensesForm.get('amount')!;
  }
  get TRANSACTIONDATE() {
    return this.ExpensesForm.get('transactionDate')!;
  }
  get REFERENCES() {
    return this.ExpensesForm.get('references')!;
  }
  get COMMENTS() {
    return this.ExpensesForm.get('comments')!;
  }
  get CREATEDBY() {
    return this.ExpensesForm.get('createdBy')!;
  }
  get CREATEDATE() {
    return this.ExpensesForm.get('createdDate')!;
  }
  get UPDATEDBY() {
    return this.ExpensesForm.get('updatedBy')!;
  }
  get UPDATEDDATE() {
    return this.ExpensesForm.get('updatedDate')!;
  }
 
    
  
AddExpenditures(){
  // console.log(this.ExpensesForm.get('flatId')?.value?.id);
  const varr=(this.ExpensesForm.get('flatId')?.value) as any;
  console.log(varr.id);
  
        this.serv3.InsertNewExpense(this.ExpensesForm.value).subscribe(data=>{
          console.log("k0ko",data);
          if(data!=null){
            alert("SuccesFully Added")
            this.myForm.resetForm()
            this.dialogs=false
            this.ngOnInit()
          }
         
        })
  }
  cancelTransaction(){
    this.ExpensesForm.markAsUntouched()
    this.myForm.resetForm()
    this.dialogs=false
   
  }
  UpdateExpenditures(id:any,amount:any,transactionDate:any,flatNumber:any,type:any,faltId:any,comments:any){
    this.updateCondition=false
    this.updateCondition1=true
    this.dialogs=true
    this.uID=id
    this.uFLATID=faltId
    this.uAMOUNT=amount
    this.uTRANSACTIONDATE=transactionDate
    this.uTYPE=type
    // this.ExpensesForm=new FormGroup({
    //   communityId:new FormControl(),
    //   flatId:new FormControl(faltId,[Validators.required]),
    //   type:new FormControl(type,Validators.required),
    //   amount:new FormControl(amount,Validators.required),
    //   transactionDate:new FormControl(transactionDate,Validators.required),
    //   references:new FormControl(''),
    //   comments:new FormControl(''),
    //   createdBy:new FormControl(''),
    //   createdDate:new FormControl(),
    //   updatedBy:new FormControl(''),
    //   updatedDate:new FormControl()
    // })
    this.ExpensesForm.setValue({
      communityId: this.tenantCommunityId,
      flatId: this.dict[flatNumber],
      type: type,
      amount: amount,
      transactionDate: transactionDate,
      references: null,
      comments: comments,
      createdBy: this.tenantName,
      createdDate: null,
      updatedBy: null,
      updatedDate: null
    })
  }
  update(){
    // this.ExpensesForm=new FormGroup({
    //   communityId:new FormControl(),
    //   flatId:new FormControl(this.uFLATID,[Validators.required]),
    //   type:new FormControl(this.uTYPE,Validators.required),
    //   amount:new FormControl(this.uAMOUNT,Validators.required),
    //   transactionDate:new FormControl(this.uTRANSACTIONDATE,Validators.required),
    //   references:new FormControl(''),
    //   comments:new FormControl(''),
    //   createdBy:new FormControl(''),
    //   createdDate:new FormControl(),
    //   updatedBy:new FormControl(''),
    //   updatedDate:new FormControl()
    // })
    let reps=this.http.put("http://localhost:2030/case/updateExpenses/"+this.uID+'/'+this.uFLATID,this.ExpensesForm.value).subscribe((data=>{
      console.log("updated",data);
      if(data!=null){
       alert("Successfully Updated")
       this.dialogs=false
       this.ngOnInit()
      }
      this.ExpensesForm.setValue({
        // id: undefined,
        communityId: this.tenantCommunityId,
        flatId: null,
        type: null,
        amount: null,
        transactionDate: null,
        references: null,
        comments: null,
        createdBy: this.tenantName,
        createdDate: null,
        updatedBy: null,
        updatedDate: null
      })
    }))
  }
  // changeCommunity(x:any,y:any){
  //   console.log("josh hii");
    
  //   this.serv3.set_ComIdFromManager(parseInt(x))
  //   this.serv3.set_CommunityName(y)
  //   this.dynamicCommunityName=y
  //   console.log("josh");
    
  //   let resp=this.http.get("http://localhost:2022/case/tenantsByComId/"+parseInt(x)+'/'+this.serv3.get_TenantName1()).
  //   subscribe((data=>{
  //     console.log("dataaa",data);
  //     this.j=data
  //     this.serv3.set_TenantFlatId(this.j[0].flatId) //when tenant details are fetched by name and com-id then original flat id is obtained
  //     location.reload()
  //   }))
  //  }
   logout(){
    sessionStorage.clear()
    this.route.navigate([''])
   }
   getExpensesByMonth(){
    console.log("hii",this.currYear,this.month);
    this.monthName=this.months[parseInt(this.month)-1]
    if(this.currYear.toString().length!=4){
      alert("please enter year in YYYY format")
   }
   else{
   let response=this.http.get("http://localhost:2030/case/expenses/byMonthAndComId/"+this.month+'/'+ this.currYear+'/'+this.tenantCommunityId)
   .subscribe(((data:any)=>{
     this.x=data
     this.dataSource=new MatTableDataSource(data)
       this.dataSource.paginator=this.paginator
       this.dataSource.sort=this.matSort
   }))
  }
  }
   filterData($event:any){
    this.dataSource.filter=$event.target.value
   }
   getExpensesByRange(){
    this.fromDate=formatDate(this.fromDate,'dd-MMM-yyyy','en_US');
    this.toDate=formatDate(this.toDate,'dd-MMM-yyyy','en_US');
    console.log(this.fromDate);
    console.log(this.toDate);
    let resp=this.http.get("http://localhost:2030/case/expensesRange/"+this.fromDate+'/'+this.toDate+'/'+this.tenantCommunityId)
    .subscribe(((data:any)=>{
      console.log(data);
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.matSort
    }))
   }
  ngOnInit(): void {
    //===============================================main code is below
    if(this.serv3.get_tenantRole()=="communityManager"){ //checks if the logged in tenant is a community manager or not
      if(parseInt(this.serv3.get_ComIdFromManager()!)==0){ // if CM is not from different communities
        this.tenantCommunityId= JSON.parse(this.serv3.get_CommunitiesOfManagers()!)[0];
      } 
      else{   // if CM is from different communities
        this.topNavigate=true
        this.tenantCommunityId=parseInt(this.serv3.get_ComIdFromManager()!)
        this.allCommunitiesOfOneManager=JSON.parse(this.serv3.get_CommunitiesOfManagers()!)
        this.allCommunitiesOfOneManager.forEach((val:any) => {
          this.serv3.GetCommunitiesById(val).subscribe((data=>{
            this.temp=data
            this.dict2[this.temp[0].id]=this.temp[0].communityName
          }))
        }); 
      }
    }
    else if(this.serv3.get_tenantRole()!="communityManager" && parseInt(this.serv3.get_ComIdFromManager()!)!=0){
      this.topNavigate=true
      this.tenantCommunityId=parseInt(this.serv3.get_ComIdFromManager()!)
      this.allCommunitiesOfOneManager=JSON.parse(this.serv3.get_CommunitiesOfManagers()!)
       //below code gets all community details and stores names and ids in a dictionary 
  this.allCommunitiesOfOneManager.forEach((val:any) => {
    this.serv3.GetCommunitiesById(val).subscribe((data=>{
      this.temp=data
      this.dict2[this.temp[0].id]=this.temp[0].communityName
    }))
  });
  console.log("netra",this.dict);
    }
    else{ // if he is not a community manager
      this.tenantCommunityId=JSON.parse(this.serv3.get_CommunitiesOfManagers()!)[0]
    }
     
    console.log(this.tenantCommunityId);
    let response=this.http.get("http://localhost:2030/case/expenses/byMonthAndComId/"+this.month+'/'+ this.currYear+'/'+this.tenantCommunityId)
    .subscribe(((data:any)=>{
    this.x=data
    this.dataSource=new MatTableDataSource(data)
        this.dataSource.paginator=this.paginator
        this.dataSource.sort=this.matSort
  }))
this.serv3.GetFlatsByCommunityId(this.tenantCommunityId).subscribe((data=>{
  this.z=data
  this.z.forEach((val:any) => {
    this.flatIds.push(val.id)
    this.dict[val.flatNumber]=val.id
    this.dict3[val.id]=val.flatNumber
  });
}))
this.flatIds.push(0)
this.dict["Common Area"]=0
this.dict3[0]="Common Area"
console.log("dict",this.dict);
if(this.tenantRole=='communityManager'){
  this.update_condition=true
}
this.ExpensesForm.setValue({
  // id: undefined,
  communityId: this.tenantCommunityId,
  flatId: null,
  type: null,
  amount: null,
  transactionDate: null,
  references: null,
  comments: null,
  createdBy: this.tenantName,
  createdDate: null,
  updatedBy: null,
  updatedDate: null
})
  }

  // displayFn(flat: any): string {
  //   console.log('display function', flat);
  //   console.log(flat);
    
  //    return flat && flat.flatNumber ? flat.flatNumber : '';
    
  // }
}
