import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CaseDataService } from './case-data.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  constructor(private serv:CaseDataService) { }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    let token=this.serv.get_Token()
      if (req.headers.get('No-Auth') === 'True') {
        return next.handle(req.clone());
      }
    let jwtToken=req.clone({
      setHeaders:{
        Authorization:'Bearer '+token
      }
    })
    return next.handle(jwtToken)
  }
}
