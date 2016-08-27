import {Component} from '@angular/core';
import {NavController, Toast, Loading, Modal, Storage, LocalStorage} from 'ionic-angular';
import {Login} from '../contact/login';

@Component({
    templateUrl: 'build/pages/contact/contact.html'
})
export class ContactPage {
    userInfo;

    constructor(private navCtrl:NavController) {
        this.userInfo = {};
        this.userInfo.userHead = "";
        this.userInfo.userName = "";
        this.userInfo.userPhone = "";
        this.userInfo.userLocation = "";
        this.userInfo.userAttend = "";
        this.userInfo.userBuild = "";


        if (localStorage.getItem('logined') == 'true') {
            this.userInfo.userHead = localStorage.getItem('userhead');
            this.userInfo.userName = localStorage.getItem('username');
            this.userInfo.userPhone = localStorage.getItem('userphone');
            this.userInfo.userLocation = localStorage.getItem('userlocation');
            this.userInfo.userAttend = localStorage.getItem('userattend');
            this.userInfo.userBuild = localStorage.getItem('userbuild');
        } else {
            let loginModal = Modal.create(Login);
            loginModal.onDismiss(data => {
                this.userInfo.userHead = data.userHead;
                this.userInfo.userName = data.userName;
                this.userInfo.userPhone = data.userPhone;
                this.userInfo.userLocation = data.userLocation;
                this.userInfo.userAttend = data.userAttend;
                this.userInfo.userBuild = data.userBuild;
            });
            this.navCtrl.present(loginModal);
        }
    }

    loginOut() {
        localStorage.setItem('logined', '');
        localStorage.setItem('userhead', '');
        localStorage.setItem('username', '');
        localStorage.setItem('userphone', '');
        localStorage.setItem('userlocation', '');
        localStorage.setItem('userattend', '');
        localStorage.setItem('userbuild', '');

        let loginModal = Modal.create(Login);
        this.navCtrl.present(loginModal);
    }

}
