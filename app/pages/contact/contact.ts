/// <reference path="wilddog.d.ts" />
import 'wilddog';
import {Component} from '@angular/core';
import {NavController, Toast, Loading, Modal, Storage, LocalStorage} from 'ionic-angular';
import {Login} from '../contact/login';

@Component({
    templateUrl: 'build/pages/contact/contact.html'
})
export class ContactPage {

    private userInfo:any;

    constructor(private navCtrl:NavController) {
        this.userInfo = {};
        this.userInfo.username = "";
        this.userInfo.email = "";
        this.userInfo.image = "";
        this.userInfo.coin = "";

        var ref = new Wilddog("https://plant-book.wilddogio.com");
        var authData = ref.getAuth();

        if (authData) {
            console.log('Authenticated user with uid:', authData.uid);

            var userref = new Wilddog("https://plant-book.wilddogio.com/users/" + authData.uid);
            userref.once('value', nameSnapshot => {
                var val = nameSnapshot.val();
                this.userInfo.username = val.username;
                this.userInfo.email = val.email;
            });


        } else {
            let loginModal = Modal.create(Login);
            // loginModal.onDismiss(data => {
            //     this.userInfo.userHead = data.userHead;
            //     this.userInfo.userName = data.userName;
            //     this.userInfo.userPhone = data.userPhone;
            //     this.userInfo.userLocation = data.userLocation;
            //     this.userInfo.userAttend = data.userAttend;
            //     this.userInfo.userBuild = data.userBuild;
            // });
            this.navCtrl.present(loginModal);
        }
    }

    loginOut() {

        var ref = new Wilddog("https://plant-book.wilddogio.com");
        ref.unauth();

        let loginModal = Modal.create(Login);
        this.navCtrl.present(loginModal);
    }

}
