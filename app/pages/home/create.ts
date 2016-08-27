import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/home/create.html'
})
export class CreatePage {
    bookList;

    constructor(private navCtrl:NavController, private viewCtrl:ViewController) {
        this.bookListInitial();
    }

    bookListInitial() {
        this.bookList = {};
        this.bookList.bookName = "";
        this.bookList.bookPrice = "";
        this.bookList.bookLocation = "";
        this.bookList.bookType = "";
        this.bookList.bookChange = "";
        this.bookList.bookContent = "";
        this.bookList.bookHead = "";
    }

    bookUpload() {
        console.log(this.bookList);
        this.viewCtrl.dismiss();
    }

    cancel() {
        this.viewCtrl.dismiss();
    }
}
