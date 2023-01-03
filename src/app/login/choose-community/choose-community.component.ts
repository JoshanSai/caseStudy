import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CaseDataService } from 'src/app/case-data.service';

@Component({
  selector: 'app-choose-community',
  templateUrl: './choose-community.component.html',
  styleUrls: ['./choose-community.component.css']
})

export class ChooseCommunityComponent implements OnInit {
x:any=[]
y:any=[]
z:any
x1:any
dataSource!:MatTableDataSource<any>
@ViewChild(MatSort) matSort!: MatSort;
@ViewChild('paginator') paginator!: MatPaginator
displayedColumns: String[]=['id','communityName','communityAddress','registeredDate','navigate'];
  constructor(private http:HttpClient,private serv2: CaseDataService,private route:Router) {
    // this.x=this.serv2.communitiesOfManagers
    this.x = JSON.parse(this.serv2.get_CommunitiesOfManagers()!); //session
    console.log("ppppp",this.x);
    
this.x.forEach((any: any) => {
 this.serv2.GetCommunitiesById(any).subscribe(((data:any)=>{
      console.log(data);
      this.y.push(data); 
      this.z=this.y
      this.dataSource=new MatTableDataSource(this.z)
        this.dataSource.paginator=this.paginator
        this.dataSource.sort=this.matSort
    } ))
});
    
   }
getId(id: any){
  this.serv2.set_ComIdFromManager(id)
  this.serv2.GetCommunitiesById(id).subscribe((data=>{
    let x:any=data
    this.serv2.set_CommunityName(x[0].communityName)

  }))
  let resp=this.http.get("http://localhost:2030/case/tenantsByComId/"+parseInt(this.serv2.get_ComIdFromManager()!)+'/'+this.serv2.get_TenantName1()).
    subscribe((data=>{
      console.log("dataaa",data);
      this.x1=data
      this.serv2.set_TenantFlatId(this.x1[0].flatId) //when tenant details are fetched by name and com-id then original flat id is obtained
      this.route.navigate(['/tenantCommon'])
    }))
  console.log('id',id);
  console.log(this.serv2.comIdFromManager);
}
logout(){
  window.sessionStorage.clear()
  this.route.navigate([''])
} 
filterData($event:any){
  this.dataSource.filter=$event.target.value
 }
ngOnInit(): void {
  }

}
