/// <reference path="wilddog.d.ts" />
import 'wilddog';
import {Component} from '@angular/core';
import {NavController, Modal, Alert} from 'ionic-angular';
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
            loginModal.onDismiss( data => {
                if(data.username){
                    this.userInfo.username = data.username;
                    this.userInfo.email = data.email;
                }else{
                    this.userInfo.email = data.email;
                    let userNameInput = Alert.create({
                        title : '请输入用户名',
                        inputs : [
                            {
                                name : 'username',
                                placeholder : '用户名',
                                type : 'text'
                            }
                        ],
                        buttons : [
                            {
                                text : '确定',
                                role : '确定',
                                handler: data => {
                                    if(data.username){
                                        this.userInfo.username = data.username;
                                        this.userInfoEdit('username',data.username);
                                        return true;
                                    }else{
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

    loginOut() {

        var ref = new Wilddog("https://plant-book.wilddogio.com");
        ref.unauth();

        let loginModal = Modal.create(Login);
        this.navCtrl.present(loginModal);
    }

    userInfoEdit(key,data){
        var ref = new Wilddog("https://plant-book.wilddogio.com");
        var authData = ref.getAuth();

        if(authData){
            var userref = new Wilddog("https://plant-book.wilddogio.com/users/" + authData.uid);
            userref.child(key).set(data);
        }else{
            console.log('setting failed');
        }
    }

    userNameEdit(){
        let userNameEdit = Alert.create({
            title : '请输入用户名',
            inputs : [
                {
                    name : 'username',
                    placeholder : '用户名',
                    type : 'text'
                }
            ],
            buttons : [
                {
                    text : '确定',
                    role : '确定',
                    handler: data => {
                        if(data.username){
                            this.userInfo.username = data.username;
                            this.userInfoEdit('username',data.username);
                            return true;
                        }else{
                            return false;
                        }
                    }
                },
                {
                    text : '取消',
                    role : '取消'
                }
            ]
        });
        this.navCtrl.present(userNameEdit);
    }

}
