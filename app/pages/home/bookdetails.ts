/// <reference path="../contact/wilddog.d.ts" />
import {Component} from '@angular/core';
import {NavController, NavParams, Modal, Storage, LocalStorage} from 'ionic-angular';
import {ChangePage} from './change';
import {Discuss} from './discuss';
import 'wilddog';

@Component({
    templateUrl: 'build/pages/home/bookdetails.html'
})
export class BookDetails {

    private bookList:any;
    private bid:string;

    constructor(private navCtrl:NavController, private navParams:NavParams) {
        this.bookList = navParams.data.book;
        this.bid = navParams.data.book.bid;
    }

    bookListSave() {

    }

    bookChange() {
        let bookChangeModal = Modal.create(ChangePage);
        this.bookListSave();
        this.navCtrl.present(bookChangeModal);
    }

    commend(){
        this.navCtrl.push(Discuss, this.bid);
    }
}
