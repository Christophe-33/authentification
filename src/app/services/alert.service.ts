import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject: Subject<any>= new Subject();
  private keepAfterRouteChange=false;

  constructor(private router: Router) {
    this.router.events.subscribe(
      (event)=>{
        if(event instanceof NavigationStart){
          if(this.keepAfterRouteChange){
            this.keepAfterRouteChange=false;
          }else{
            this.clear();
          }
        }
      }
    )
  }

  public success(message:string,keepAfterRouteChange=false){
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({type: "success",text : message})
  }

  public error(message:string,keepAfterRouteChange=false){
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({type: "error",text : message})
  }

  public clear(){
    this.subject.next();
  }

  public getAlert(): Observable<any>{
    return this.subject.asObservable();
  }

}
