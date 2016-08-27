/// <reference path="wilddog.d.ts" />
import {Component} from '@angular/core';
import {NavController, ViewController, Toast, Loading, Modal, Storage, LocalStorage} from 'ionic-angular';
import {Register} from '../contact/register';
import 'wilddog';

@Component({
    templateUrl: 'build/pages/contact/login.html'
})

export class Login {
    private user:any;
    private userInfo:any;

    constructor(private navCtrl:NavController, private viewCtrl:ViewController) {
        this.user = {};
        this.user.email = "";
        this.user.password = "";

        // this.userInfo = {};
        // this.userInfo.userHead = "../images/1.jpg";
        // this.userInfo.userName = "zyktrcn";
        // this.userInfo.email = "15622386480";
        // this.userInfo.userLocation = "广州";
        // this.userInfo.userAttend = "50";
        // this.userInfo.userBuild = "50";
    }

    //登陆操作
    login() {
        //判断成功则提示“email不能为空”
        if (this.user.username == "") {
            let usernameFormat = Toast.create({
                message: "email不能为空",
                duration: 2000
            });

            this.navCtrl.present(usernameFormat);

        }
        //判断密码是否为空
        //判断成功则提示“密码不能为空”
        else if (this.user.password == "") {
            let passwordFormat = Toast.create({
                message: "密码不能为空",
                duration: 2000
            });

            this.navCtrl.present(passwordFormat);

        }
        //用户名和密码格式正确后处理
        else {
            //登陆Loading
            let loginLoading = Loading.create({
                spinner: "circles",
                content: "正在登陆"
            });

            this.navCtrl.present(loginLoading);

            this.authWithPasswordByWilddog(this.user.email, this.user.password)

            setTimeout(() => {
                loginLoading.dismiss();
            }, 3000);
        }
    }

    /**
     * 跳转至注册页面
     */
    register() {
        let register = Modal.create(Register);
        this.navCtrl.present(register);
    }


    /**
     * Wilddog.authWithPassword()
     * @param email
     * @param password
     */
    public authWithPasswordByWilddog(email:string, password:string) {
        var ref = new Wilddog('https://plant-book.wilddogio.com');
        // Log me in
        ref.authWithPassword({
            "email": email,
            "password": password
        }, function (error, authData) {
            if (error) {
                console.log('Login Failed!', error);
            } else {
                console.log('Authenticated successfully with payload:', authData);
            }
        });
    }
}
