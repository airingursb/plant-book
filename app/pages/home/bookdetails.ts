/// <reference path="../contact/wilddog.d.ts" />
import {Component} from '@angular/core';
import {NavController, NavParams, Modal, Storage, LocalStorage} from 'ionic-angular';
import {ChangePage} from '../home/change';
import 'wilddog';

@Component({
    templateUrl: 'build/pages/home/bookdetails.html'
})
export class BookDetails {
    bookList;

    constructor(private navCtrl:NavController, private navParams:NavParams) {
        this.bookList = navParams.data.book;
    }

    bookListSave() {

    }

    bookChange() {
        let bookChangeModal = Modal.create(ChangePage);
        this.bookListSave();
        this.navCtrl.present(bookChangeModal);
    }
}
