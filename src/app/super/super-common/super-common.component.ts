import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CaseDataService } from 'src/app/case-data.service';

@Component({
  selector: 'app-super-common',
  templateUrl: './super-common.component.html',
  styleUrls: ['./super-common.component.css']
})
export class SuperCommonComponent implements OnInit{
Suser:any
communityName:any
communityFlatCondition=true
  constructor(private serv:CaseDataService,private router:Router) { 
    
  }

ngOnInit(): void {
    this.Suser=this.serv.get_SuperUserName()
    this.communityName=this.serv.get_ComNameFromAdmin()
  }
parentMethod(data:any){
    this.communityName=data
    this.communityFlatCondition=false
}
logout(){
  this.serv.set_LoginVariable("")
  this.router.navigate([''])
}

}
