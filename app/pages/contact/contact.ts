/// <reference path="wilddog.d.ts" />
import 'wilddog';
import {Component} from '@angular/core';
import {NavController, Modal, Alert} from 'ionic-angular';
import {Login} from './login';
import {imageEditPage} from './imageedit';

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

    }

    onPageWillEnter() {
        var ref = new Wilddog("https://plant-book.wilddogio.com");
        var authData = ref.getAuth();

        if (authData) {
            console.log('Authenticated user with uid:', authData.uid);

            var userref = new Wilddog("https://plant-book.wilddogio.com/users/" + authData.uid);
            userref.once('value', nameSnapshot => {
                var val = nameSnapshot.val();
                this.userInfo.username = val.username;
                this.userInfo.email = val.email;
                if (val.coin) {
                    this.userInfo.coin = val.coin;
                } else {
                    this.userInfo.coin = 0;
                    userref.child('coin').set(0);
                }
                if (val.image) {
                    this.userInfo.image = val.image;
                } else {
                    this.userInfo.image = 'http://airing.ursb.me/image/avatar/40.png';
                    userref.child('image').set('http://airing.ursb.me/image/avatar/40.png');
                }

            });
        } else {
            let loginModal = Modal.create(Login);
            loginModal.onDismiss(data => {
                if (data.username) {
                    this.userInfo.username = data.username;
                    this.userInfo.email = data.email;
                } else {
                    this.userInfo.email = data.email;
                    let userNameInput = Alert.create({
                        title: '请输入用户名',
                        inputs: [
                            {
                                name: 'username',
                                placeholder: '用户名',
                                type: 'text'
                            }
                        ],
                        buttons: [
                            {
                                text: '确定',
                                role: '确定',
                                handler: data => {
                                    if (data.username) {
                                        this.userInfo.username = data.username;
                                        this.userInfoEdit('username', data.username);
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }
                            }
                        ]
                    });
                    this.navCtrl.present(userNameInput);
                }
            });
            this.navCtrl.present(loginModal);
        }
    }

    /**
     * 注销用户
     */
    loginOut() {
        var ref = new Wilddog("https://plant-book.wilddogio.com");
        // 注销用户
        ref.unauth();

        // 返回登录页
        let loginModal = Modal.create(Login);
        this.navCtrl.present(loginModal);
    }

    userInfoEdit(key, data) {
        var ref = new Wilddog("https://plant-book.wilddogio.com");
        var authData = ref.getAuth();

        if (authData) {
            var userref = new Wilddog("https://plant-book.wilddogio.com/users/" + authData.uid);
            userref.child(key).set(data);
        } else {
            console.log('setting failed');
        }
    }

    userNameEdit() {
        let userNameEdit = Alert.create({
            title: '请输入用户名',
            inputs: [
                {
                    name: 'username',
                    placeholder: '用户名',
                    type: 'text'
                }
            ],
            buttons: [
                {
                    text: '确定',
                    role: '确定',
                    handler: data => {
                        if (data.username) {
                            this.userInfo.username = data.username;
                            this.userInfoEdit('username', data.username);
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                {
                    text: '取消',
                    role: '取消'
                }
            ]
        });
        this.navCtrl.present(userNameEdit);
    }

    imageEdit(){
        var ref = new Wilddog("https://plant-book.wilddogio.com");
        var authData = ref.getAuth();

        if(authData){
            this.navCtrl.push(imageEditPage,authData.uid);
        }else{
            console.log('setting failed');
        }
    }
}
