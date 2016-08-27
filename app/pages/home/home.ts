import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {BookDetails} from '../home/bookdetails';
import {SearchPage} from '../home/search';
import {CreatePage} from '../home/create';

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    bookList

    constructor(private navCtrl:NavController) {
        this.bookList = [
            {
                "bookHead": "../images/1.jpg",
                "bookName": "Test Book1",
                "bookSituation": "等待交换",
                "bookContent": "This is a test book!This is a test book!This is a test book!This is a test book!This is a test book!",
                "bookLocation": "广州花都",
                "bookType": "科幻小说",
                "bookChange": "快递交换",
                "bookPrice": "400",
                "bookUser": "zyktrcn",
                "userHead": "../images/1.jpg"
            },
            {
                "bookHead": "../images/2.jpg",
                "bookName": "Test Book2",
                "bookSituation": "等待交换",
                "bookContent": "This is a test book!This is a test book!This is a test book!This is a test book!This is a test book!",
                "bookLocation": "安徽六安",
                "bookType": "言情小说",
                "bookChange": "快递交换",
                "bookPrice": "350",
                "bookUser": "zyktrcn",
                "userHead": "../images/1.jpg"
            },
            {
                "bookHead": "../images/3.jpg",
                "bookName": "Test Book3",
                "bookSituation": "交易中",
                "bookContent": "This is a test book!This is a test book!This is a test book!This is a test book!This is a test book!",
                "bookLocation": "台湾台北",
                "bookType": "教材",
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
                "bookLocation": "香港尖沙咀",
                "bookType": "辅导书",
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
                "bookLocation": "广州大学城",
                "bookType": "参考书",
                "bookChange": "当面交换",
                "bookPrice": "700",
                "bookUser": "zyktrcn",
                "userHead": "../images/1.jpg"
            },
        ]
    }

    bookDetailClick(event, book) {
        this.navCtrl.push(BookDetails, {book: book});
    }

    search() {
        let searchModal = Modal.create(SearchPage);
        this.navCtrl.present(searchModal);
    }

    create() {
        let createModal = Modal.create(CreatePage);
        this.navCtrl.present(createModal);
    }
}
