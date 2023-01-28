import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseDataService } from 'src/app/case-data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
comID:any
communityName:any
  constructor(private route:ActivatedRoute,private serv:CaseDataService) { 
    this.comID = this.route.snapshot.params['id'];
    this.serv.set_ComIdFromAdmin(this.comID)
    this.serv.GetCommunitiesById(this.comID).subscribe((data=>{
      let x:any=data
    this.communityName=x[0].communityName
     this.serv.set_ComNameFromAdmin(this.communityName)
    }))
  }
  
  ngOnInit(): void {
  }

}
