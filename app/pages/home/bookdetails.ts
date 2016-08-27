import {Component} from '@angular/core';
import {NavController, NavParams, Modal, Storage, LocalStorage} from 'ionic-angular';
import {ChangePage} from '../home/change';

@Component({
    templateUrl: 'build/pages/home/bookdetails.html'
})
export class BookDetails {
    bookList

    constructor(private navCtrl:NavController, private navParams:NavParams) {
        this.bookList = navParams.data.book;
    }

    bookListSave() {
        localStorage.setItem('bookhead', this.bookList.bookHead);
        localStorage.setItem('bookname', this.bookList.bookName);
        localStorage.setItem('booklocation', this.bookList.bookLocation);
        localStorage.setItem('bookcontent', this.bookList.bookContent);
    }

    bookChange() {
        let bookChangeModal = Modal.create(ChangePage);
        this.bookListSave();
        this.navCtrl.present(bookChangeModal);
    }
}
