import { Tiquete } from './../models/tiquete';
import { Injectable, EventEmitter, Inject } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';

@Injectable({
  providedIn: 'root'
})
export class SignarRService {
  baseUrl: string;
  private hubConnection: signalR.HubConnection;
  signalReceived = new EventEmitter<Tiquete>();

  constructor( private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
    this.buildConnection();
    this.startConnection();
  }
  private buildConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(this.baseUrl + "signalHub").build();
  }
  private startConnection = () => {
    this.hubConnection
    .start()
    .then(() => {
      console.log("Connection Started...");
      this.registerSignalEvents();
    })
    .catch(err => {
      console.log("Error ehile starting connection:" + err);
      setTimeout(function(){
        this.startConnection();
      }, 3000);
    });
  }
  private registerSignalEvents(){
    this.hubConnection.on("TiqueteRegistrado", (data: Tiquete) => {
      this.signalReceived.emit(data);
    })
  }
}
