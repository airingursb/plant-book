import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BookDetails} from '../home/bookdetails';
import {BookEdit} from '../about/edit';
import {UserAttend} from '../about/attend';
import {UserBuild} from '../about/build';

@Component({
    templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
    userAttendList;
    userBuildList;

    constructor(private navCtrl:NavController) {
        this.userAttendList = [
            {
                "bookHead": "../images/1.jpg",
                "bookName": "Test Book1",
                "bookSituation": "等待交换",
                "bookContent": "This is a test book!This is a test book!This is a test book!This is a test book!This is a test book!",
                "bookLocation": "广州",
                "bookType": "科幻小说",
                "bookChange": "当面交换",
                "bookPrice": "400",
                "bookUser": "zyktrcn",
                "userHead": "../images/1.jpg"
            },
            {
                "bookHead": "../images/2.jpg",
                "bookName": "Test Book2",
                "bookSituation": "等待交换",
                "bookContent": "This is a test book!This is a test book!This is a test book!This is a test book!This is a test book!",
                "bookLocation": "安徽",
                "bookType": "言情小说",
                "bookChange": "当面交换",
                "bookPrice": "350",
                "bookUser": "zyktrcn",
                "userHead": "../images/1.jpg"
            },
            {
                "bookHead": "../images/3.jpg",
                "bookName": "Test Book3",
                "bookSituation": "交易中",
                "bookContent": "This is a test book!This is a test book!This is a test book!This is a test book!This is a test book!",
                "bookLocation": "台湾",
                "bookType": "教科书",
                "bookChange": "快递交换",
                "bookPrice": "800",
                "bookUser": "zyktrcn",
                "userHead": "../images/1.jpg"
            },
        ]
        this.userBuildList = [
            {
                "bookHead": "../images/3.jpg",
                "bookName": "Test Book3",
                "bookSituation": "交易中",
                "bookContent": "This is a test book!This is a test book!This is a test book!This is a test book!This is a test book!",
                "bookLocation": "台湾",
                "bookType": "教科书",
                "bookChange": "快递交换",
                "bookPrice": "800",
                "bookUser": "zyktrcn",
                "userHead": "../images/1.jpg"
            },
            {
                "bookHead": "../images/4.jpg",
                "bookName": "Test Book4",
                "bookSituation": "等待交换",
                "bookContent": "This is a test book!This is a test book!This is a test book!This is a test book!This is a test book!",
                "bookLocation": "香港",
                "bookType": "科幻小说",
                "bookChange": "快递交换",
                "bookPrice": "450",
                "bookUser": "zyktrcn",
                "userHead": "../images/1.jpg"
            },
            {
                "bookHead": "../images/5.jpg",
                "bookName": "Test Book5",
                "bookSituation": "交换中",
                "bookContent": "This is a test book!This is a test book!This is a test book!This is a test book!This is a test book!",
                "bookLocation": "广州",
                "bookType": "言情小说",
                "bookChange": "快递交换",
                "bookPrice": "700",
                "bookUser": "zyktrcn",
                "userHead": "../images/1.jpg"
            },
        ]
    }

    bookDetailClick(event, userAttend) {
        this.navCtrl.push(BookDetails, {book: userAttend});
    }

    userAttendMore(event) {
        this.navCtrl.push(UserAttend, {book: this.userAttendList});
    }

    bookDetailEdit(event, userBuild) {
        this.navCtrl.push(BookEdit, {book: userBuild});
    }

    userBuildMore(event) {
        this.navCtrl.push(UserBuild, {book: this.userBuildList});
    }
}
