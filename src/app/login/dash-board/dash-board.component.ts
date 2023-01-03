import { Component, OnInit } from '@angular/core';
import { CaseDataService } from 'src/app/case-data.service';
import { Chart,Colors,registerables} from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
Chart.register(...registerables)
Chart.register(Colors);

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
x:any=[]

month:any;
myChart:any
lableData:any=[]
dataData:any=[]
currMonth=new Date()
currMonth2:any
communityId=0
allCommunitiesOfOneManager:any
temp:any
dict:any={}
dynamicCommunityName:any
j: any;
comName:any
topNavigate=false
totalExpense:any
currYear:any
months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
monthName:any
currMonthIn2Digits:any
  constructor(private serv3 :CaseDataService,private http:HttpClient,private route :Router) {
    this.currMonth2=this.currMonth.getMonth()+1;
    this.currMonthIn2Digits=String(this.currMonth2).padStart(2, '0')
    this.monthName=this.months[parseInt(this.currMonth2)-1]
    this.currYear=this.currMonth.getFullYear()
    if(this.serv3.get_tenantRole()=="communityManager"){ //checks if the logged in tenant is a community manager or not
      if(parseInt(this.serv3.get_ComIdFromManager()!)==0){ // if CM is not from different communities
        this.communityId=JSON.parse(this.serv3.get_CommunitiesOfManagers()!)[0];
      } 
      else{   // if CM is from different communities
        this.topNavigate=true
        this.communityId=parseInt(this.serv3.get_ComIdFromManager()!)
        this.allCommunitiesOfOneManager=JSON.parse(this.serv3.get_CommunitiesOfManagers()!)
         //below code gets all community details and stores names and ids in a dictionary 
    this.allCommunitiesOfOneManager.forEach((val:any) => {
      this.serv3.GetCommunitiesById(val).subscribe((data=>{
        this.temp=data
        this.dict[this.temp[0].id]=this.temp[0].communityName
      }))
    });
    console.log("netra",this.dict);
    
      }
    }
    else if(this.serv3.get_tenantRole()!="communityManager" && parseInt(this.serv3.get_ComIdFromManager()!)!=0){
      this.topNavigate=true
      this.communityId=parseInt(this.serv3.get_ComIdFromManager()!)
      this.allCommunitiesOfOneManager=JSON.parse(this.serv3.get_CommunitiesOfManagers()!)
       //below code gets all community details and stores names and ids in a dictionary 
  this.allCommunitiesOfOneManager.forEach((val:any) => {
    this.serv3.GetCommunitiesById(val).subscribe((data=>{
      this.temp=data
      this.dict[this.temp[0].id]=this.temp[0].communityName
    }))
  });
  console.log("netra",this.dict);
    }
    else{ // if he is not a community manager
      this.communityId=JSON.parse(this.serv3.get_CommunitiesOfManagers()!)[0];
    }  
    //below code displays current month graph
    let response=this.http.get("http://localhost:2030/case/expenses/byMonthAndComId/"+this.currMonthIn2Digits+'/'+ this.currYear+'/'+this.communityId).subscribe((data=>{
      this.x=data
      if(this.x!=null){
        this.totalExpense=0
        this.x.forEach(((val:any)=>{
          this.totalExpense=this.totalExpense+val.amount
          if(val.communityId==this.communityId){
           this.lableData.push( val.transactionDate.slice(8,))
           if(val.type=="credit"){
            this.dataData.push(val.amount)
           }
           else{ 
            this.dataData.push(-val.amount)
           }
           
          } 
        }));
        this.renderChart(this.lableData,this.dataData) 
        this.dataData=[]
        this.lableData=[] 
      }
    }))
    // this.myChart =new Chart("pieChart", {
    //   type: 'bar',
      
    //   data: {
    //     labels: this.lableData,
    
    //     datasets: [{
    //       label: 'Amount',
    //       data: this.dataData,
    //       borderWidth: 0,
    //       backgroundColor: ['rgb(255, 99, 132)',
    //       'rgb(54, 162, 235)',
    //       'rgb(255, 205, 86)',
    //       'rgb(75, 192, 192)'],
          
    //     }]
    //   },
    //   options: {
    //       scales: {
    //         x: {grid: {display: false,},},
    //        }
    //   }
    // });
   }

    getExpensesByMonth(){
      this.currMonth2=this.month
      this.currMonthIn2Digits=String(this.currMonth2).padStart(2, '0')
    let response=this.http.get("http://localhost:2030/case/expenses/byMonthAndComId/"+this.currMonthIn2Digits+'/'+ this.currYear+'/'+this.communityId).subscribe((data=>{
      this.x=data
      console.log(">>>>>",this.x);
      if(this.x[0]!=null){
        this.totalExpense=0
        this.monthName=this.months[parseInt(this.month)-1]
        this.x.forEach(((val:any)=>{
          this.totalExpense=this.totalExpense+val.amount
          if(val.communityId==this.communityId){
           this.lableData.push( val.transactionDate.slice(8,))
           if(val.type=="credit"){
            this.dataData.push(val.amount)
           }
           else{ 
            this.dataData.push(-val.amount)
           }
           
          } 
        }));
        this.renderChart(this.lableData,this.dataData) 
        this.dataData=[]
        this.lableData=[] 
      }
      else if(this.currYear.toString().length!=4){
        alert("please enter year in YYYY format")
      }
      else{
        alert("data not availabe")
      }
    }))
   }
   renderChart(creditData:any,debitData:any){

    if(this.myChart instanceof Chart){
      this.myChart.destroy()
    }
    console.log(creditData,debitData);
    
    this.myChart =new Chart("pieChart", {
      type: 'bar',
      data: {
        labels: creditData,
    
        datasets: [{
          label: 'Amount',
          data: debitData,
          borderWidth: 0,
          backgroundColor: [
          'rgb(54, 162, 235)',],
          
        }]
      },
      options: {
          scales: {
            x: {grid: {display: false,},},
           }
      }
    });
   }
  // changeCommunity(x:any,y:any){
  //   this.serv3.set_ComIdFromManager(parseInt(x))
  //   this.serv3.set_CommunityName(y)
  //   this.dynamicCommunityName=y
  //   console.log("josh");
    
  //   let resp=this.http.get("http://localhost:2022/case/tenantsByComId/"+parseInt(x)+'/'+this.serv3.get_TenantName1()).
  //   subscribe((data=>{
  //     console.log("dataaa",data);
  //     this.j=data
  //     this.serv3.set_TenantFlatId(this.j[0].flatId) //when tenant details are fetched by name and com-id then original flat id is obtained
  //     window.location.reload()
  //   }))
  //  }
  ngOnInit(): void {

    console.log(this.currMonth);
    this.month=(this.currMonth.getMonth()+1).toString();
    console.log(">>>> month",this.month);
    
    this.comName=this.serv3.get_CommunityName()
    console.log("harsh",this.comName);
  }

}
