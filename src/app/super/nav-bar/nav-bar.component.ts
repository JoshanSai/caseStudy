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
  constructor(private route:ActivatedRoute,private serv:CaseDataService) { 
    this.comID = this.route.snapshot.params['id'];
    this.serv.set_ComIdFromAdmin(this.comID)
  }
  
  ngOnInit(): void {
  }

}
