import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Superclass } from './login/superclass';
import { Tenantclass } from './tenantclass';

@Injectable({
  providedIn: 'root'
})
export class CaseDataService {
Suser:any
communityName:any//when super user loggs in, getting from community component from constructor
communitiesOfManagers:any // gets community id from community manager component after login
communityId=0 //community id coming when super user touches one community 
comIdFromManager=0 // gets community from choose community component
tenantName:any //gets tenant name from community manager component at line 46
tenantRole="" //gets tenant role from community manager component after line 46
tenantFlatId:any
url1="http://localhost:2022/case/verify"
url2="http://localhost:2022/case/verify-tenant"
url3="http://localhost:2022/case/flatsId/"
url4="http://localhost:2022/case/communityId/"
url5="http://localhost:2022/case/community/"
url6="http://localhost:2022/case/flats/"
url7="http://localhost:2022/case/tenants/"
url8="http://localhost:2022/case/putFlats/"
url9="http://localhost:2022/case/putTenants/"
url10="http://localhost:2022/case/expenses/"
url11="http://localhost:2022/case/putExpenses"
url12="http://localhost:2022/case/guestRooms/"
url13="http://localhost:2022/case/putBooking"
url14="http://localhost:2022/case/getBookings/"
url15="http://localhost:2022/case/allBookings/"
url16="http://localhost:2022/case/status/"
url17="http://localhost:2022/case/putBookingF"
url18="http://localhost:2022/case/getBookingsF/"
url19="http://localhost:2022/case/allBookingsF/"
url20="http://localhost:2022/case/statusF/"
url21="http://localhost:2022/case/functionHalls/"
url22="http://localhost:2022/case/tenantsByComId/"

requestHeader = new HttpHeaders({
  "No-Auth": "True"
});

SuperUserDetails(superclass:Superclass): Observable<object>{
  return this.http.post(this.url1,superclass,{headers: this.requestHeader})
}
GetTenantsByName(tenant : Tenantclass): Observable<object>{
  return this.http.post(this.url2,tenant,{headers: this.requestHeader})
}
GetFlatsById(x:any): Observable<object>{
  return this.http.get(this.url3+x)
}
GetCommunitiesById(x:any): Observable<object>{
  return this.http.get(this.url4+x)
}
GetCommunityByCreatorName(x:any):Observable<object>{
  return this.http.get(this.url5+x)
}
GetFlatsByCommunityId(x:any):Observable<object>{
  return this.http.get(this.url6+x)
}
GetAllTenants():Observable<object>{
  return this.http.get(this.url7)
}
InsertNewFlats(x:any):Observable<object>{
  return this.http.post(this.url8,x)
}
InsertNewTenants(x:any,y:any):Observable<object>{
  return this.http.post(this.url9+x,y)
}
  constructor(private http:HttpClient) { }
GetExpensesByCommunityId(x:any):Observable<object>{
  return this.http.get(this.url10+x)
}
GetAllExpenses():Observable<object>{
  return this.http.get(this.url10)
}
InsertNewExpense(x:any):Observable<object>{
  return this.http.post(this.url11,x)
}
GetGuestRoomsByCommunityId(x:any):Observable<object>{
  return this.http.get(this.url12+x)
}
InsertBookingDetails(x:any):Observable<object>{
  return this.http.post(this.url13,x)
}
GetBookingsByFlatIdAndType(x:any,y:any,z:any):Observable<Object>{
  return this.http.get(this.url14+x+'/'+y+'/'+z)
}
GetAllBookingDetailsByTypeAndCommunityId(x:any,y:any):Observable<object>{
  return this.http.get(this.url15+x+'/'+y)
}
UpdateBookingStatusForGuestRooms(x:any,y:any):Observable<object>{;
  return this.http.get(this.url16+x+'/'+y)
}
GetGuestRoomsByCommunityIdF(x:any):Observable<object>{
  return this.http.get(this.url21+x)
}
InsertBookingDetailsF(x:any):Observable<object>{
  return this.http.post(this.url17,x)
}
GetBookingsByFlatIdAndTypeF(x:any,y:any,z:any):Observable<Object>{
  return this.http.get(this.url18+x+'/'+y+'/'+z)
}
GetAllBookingDetailsByTypeF(x:any):Observable<object>{
  return this.http.get(this.url19+x)
}
UpdateBookingStatusForGuestRoomsF(x:any,y:any):Observable<object>{;
  return this.http.get(this.url20+x+'/'+y)
}
GetTenantsByCommunityId(x:any):Observable<object>{
  return this.http.get(this.url22+x)
}
//=============================================================================
get_TenantName1(){
  return sessionStorage.getItem('tenantName')
}
set_TenantName1(x: any){
  sessionStorage.setItem('tenantName', x)
}
get_CommunitiesOfManagers(){
  return sessionStorage.getItem('communitiesOfManagers');
}
set_CommunitiesOfManagers(x:any){
  console.log("sssssss",x);
  return sessionStorage.setItem('communitiesOfManagers',JSON.stringify(x));
}
get_ComIdFromManager(){
  return sessionStorage.getItem('comIdFromManager');
}
set_ComIdFromManager(x:any){
  console.log("sssssss",x);
  return sessionStorage.setItem('comIdFromManager',JSON.stringify(x));
}
get_tenantRole(){
  return sessionStorage.getItem('tenantRole');
}
set_tenantRole(x:any){
  console.log("sssssss",x);
  return sessionStorage.setItem('tenantRole',x);
}
get_CommunityName(){
  return sessionStorage.getItem('community name');
}
set_CommunityName(x:any){
  console.log("sssssss",x);
  return sessionStorage.setItem('community name',x);
}
get_TenantFlatId(){
  return sessionStorage.getItem('tenant falt id');
}
set_TenantFlatId(x:any){
  console.log("sssssss",x);
  return sessionStorage.setItem('tenant falt id',JSON.stringify(x));
}
get_SuperUserName(){
  return sessionStorage.getItem('Super User name');
}
set_SuperUserName(x:any){
  console.log("sssssss",x);
  return sessionStorage.setItem('Super User name',x);
}
get_ComIdFromAdmin(){
  return sessionStorage.getItem('Super User logged community');
}
set_ComIdFromAdmin(x:any){
  console.log("sssssss",x);
  return sessionStorage.setItem('Super User logged community',x); //json stringify is not used because it is already 
  // getting in string format
}
get_ComNameFromAdmin(){
  return sessionStorage.getItem('Super User logged community Name');
}
set_ComNameFromAdmin(x:any){
  console.log("sssssss",x);
  return sessionStorage.setItem('Super User logged community Name',x);
}
get_LoginVariable(){
  return sessionStorage.getItem('login variable');
}
set_LoginVariable(x:any){
  return sessionStorage.setItem('login variable',x);
}
get_Token(){
  return sessionStorage.getItem('token');
}
set_Token(x:any){
  return sessionStorage.setItem('token',x);
}
}