import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  amountToBeSent:number=0;
  amountRemaining:number=413;
  subTotal=[];
  loader;
  vendor = "vendor";
  
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  addAmount(amt:number, img:string){
    if(amt && (this.amountRemaining - amt) >= 0){
      this.amountToBeSent = Number(this.amountToBeSent) + Number(amt);
      this.amountRemaining -= amt;
      this.subTotal.push({amount: amt, imgSrc: img});
    }
    else if(this.amountToBeSent && (this.amountRemaining - this.amountToBeSent) >= 0){
      this.amountRemaining -= this.amountToBeSent;
    }
    else
    {
      (this.amountToBeSent == 0) ? this.sendToast('Add Amount!!') : this.sendToast('Insufficient funds!!');
    }
  }

  removeAmount(index:number, amt:number){
    this.subTotal.splice(index, 1);
    if((this.amountToBeSent - amt) >= 0){
      this.amountToBeSent -= amt;
      this.amountRemaining = Number(this.amountRemaining) + Number(amt);
    }else{
      this.amountToBeSent = 0;
    }
  }

  closeOtherFabs(){
    for(var i in arguments){
      console.log(arguments[i]);
      arguments[i].close();
    }
  }

  sendAmount(){
    if(this.amountToBeSent && (this.amountRemaining - this.amountToBeSent) >= 0){
      this.clearFields();
      this.showLoader();
      setTimeout(()=> {
        this.hideLoader();
        this.sendToast('Amount Sent!!');
      },1000);
    }
    return false;
  }

  sendToast(msg){
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  clearFields(){
    this.amountToBeSent = 0;
    this.subTotal = [];
  }

  showLoader(){
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

  hideLoader(){
    this.loader.dismiss();
  }
}
