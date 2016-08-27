import {Component} from '@angular/core';
import {NavController, ViewController, Storage, LocalStorage} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/home/change.html'
})
export class ChangePage {
    bookList;

    constructor(private navCtrl:NavController, private viewCtrl:ViewController) {
        this.bookList = {};
        this.bookListGet();
    }

    bookListGet() {
        this.bookList.bookHead = localStorage.getItem('bookhead');
        this.bookList.bookName = localStorage.getItem('bookname');
        this.bookList.bookLocation = localStorage.getItem('booklocation');
        this.bookList.bookContent = localStorage.getItem('bookcontent');
    }

    bookListClear() {
        localStorage.setItem('bookhead', '');
        localStorage.setItem('bookname', '');
        localStorage.setItem('booklocation', '');
        localStorage.setItem('bookcontent', '');
    }

    cancel() {
        this.bookListClear();
        this.viewCtrl.dismiss();
    }
}
