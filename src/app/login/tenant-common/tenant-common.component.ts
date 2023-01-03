import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseDataService } from 'src/app/case-data.service';

@Component({
  selector: 'app-tenant-common',
  templateUrl: './tenant-common.component.html',
  styleUrls: ['./tenant-common.component.css']
})
export class TenantCommonComponent implements OnInit {
  communityId:any
  topNavigate=false
  allCommunitiesOfOneManager:any
  temp:any
  dict:any={}
  comName:any
  dynamicCommunityName:any
  j:any
  buttonColor1="aqua"
  buttonColor2="white"
  buttonColor3="white"
  buttonColor4="white"
  userName:any
  constructor(private serv3:CaseDataService,private router:Router,private http:HttpClient) { }
  logout(){
    this.serv3.set_LoginVariable("")
    this.router.navigate([''])
  }
  ngOnInit(): void {
    this.userName=this.serv3.get_TenantName1()
    this.comName=this.serv3.get_CommunityName()
    console.log("harsh",this.comName);
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
  }
  changeCommunity(x:any,y:any){
    this.serv3.set_ComIdFromManager(parseInt(x))
    this.serv3.set_CommunityName(y)
    this.dynamicCommunityName=y
    console.log("josh");
    
    let resp=this.http.get("http://localhost:2030/case/tenantsByComId/"+parseInt(x)+'/'+this.serv3.get_TenantName1()).
    subscribe((data=>{
      console.log("dataaa",data);
      this.j=data
      this.serv3.set_TenantFlatId(this.j[0].flatId) //when tenant details are fetched by name and com-id then original flat id is obtained
      window.location.reload()
    }))
   }
   navBarBtn(x:any){
    if(x==1){
      this.buttonColor1="aqua"
      this.buttonColor2="white"
      this.buttonColor3="white"
      this.buttonColor4="white"
    }
    else if(x==2){
      this.buttonColor1="white"
      this.buttonColor2="aqua"
      this.buttonColor3="white"
      this.buttonColor4="white"
    }
    else if(x==3){
      this.buttonColor1="white"
      this.buttonColor2="white"
      this.buttonColor3="aqua"
      this.buttonColor4="white"
    }
    else if(x==4){
      this.buttonColor1="white"
      this.buttonColor2="white"
      this.buttonColor3="white"
      this.buttonColor4="aqua"
    }
   }
}
