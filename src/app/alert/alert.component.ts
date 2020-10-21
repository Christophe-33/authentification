import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  public message : any;
  private subscription : Subscription;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.subscription=this.alertService.getAlert().subscribe(
      (message)=>{
        switch(message?.type){
          case 'success':
            message.cssClass='alert alert-success';
            break;
          case 'error':
            message.cssClass='alert alert-error'
        }
        this.message=message;
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
