/// <reference path="wilddog.d.ts" />
import {Component} from '@angular/core';
import {NavController, ViewController, Toast, Loading} from 'ionic-angular';
import 'wilddog';

@Component({
    templateUrl: 'build/pages/contact/register.html'
})

export class Register {

    private user:any;

    constructor(private navCtrl:NavController, private viewCtrl:ViewController) {
        this.user = {};
        this.user.username = "";
        this.user.password = "";
        this.user.passwordconfirm = "";
        this.user.email = "";
    }

    //返回登陆界面操作
    dismiss() {
        this.viewCtrl.dismiss();
    }

    //注册操作
    register() {
        //判断用户名是否为空或长度是否小于6
        //判断正确则提示“用户名格式不正确”

        if (this.user.username == "" || this.user.username.length < 6) {
            let usernameToast = Toast.create({
                message: "用户名格式不正确",
                duration: 2000
            });

            this.navCtrl.present(usernameToast);

        }
        //判断密码是否为空
        //判断正确则提示“密码不能为空”
        else if (this.user.password == "") {
            let passwordToast = Toast.create({
                message: "密码不能为空",
                duration: 2000
            });

            this.navCtrl.present(passwordToast);
        }
        //判断密码与重复密码是否一致
        //判断正确则提示“密码与重复密码不一致”
        else if (this.user.passwordconfirm != this.user.password) {
            let passwordconfirmToast = Toast.create({
                message: "密码与重复密码不一致",
                duration: 2000
            });

            this.navCtrl.present(passwordconfirmToast);

        }
        //判断email是否为空
        //判断正确则提示“邮箱不能为空”
        else if (this.user.email == "") {
            let telephoneToast = Toast.create({
                message: "邮箱不能为空",
                duration: 2000
            });

            this.navCtrl.present(telephoneToast);

        }
        //注册资料正确则进行注册操作
        else {
            let registerLoading = Loading.create({
                spinner: "circles",
                content: "正在注册"
            });

            this.navCtrl.present(registerLoading);

            // 使用 Wilddog 进行用户注册
            this.createUserByWilddog(this.user.email, this.user.password);

            setTimeout(() => {
                registerLoading.dismiss();
            }, 3000);

            //注册操作
        }
    }

    /**
     * 使用 Wilddog 进行用户注册:Wilddog.createUser()
     * @param email
     * @param passwold
     */
    public createUserByWilddog(email:string, password:string) {
        var ref = new Wilddog("https://plant-book.wilddogio.com");
        ref.createUser({
            "email": email,
            "password": password
        }, function (err) {
            if (err) {
                switch (err.code) {
                    case 'EMAIL_TAKEN':
                    // The new user account cannot be created because the email is already in use.
                    case 'INVALID_EMAIL':
                    // The specified email is not a valid email.
                    default:
                }
            } else {
                // User account created successfully!
            }
        });
    }
}