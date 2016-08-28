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

    private book:any;
    private bid:string;
    private comments:any;

    constructor(private navCtrl:NavController, private navParams:NavParams) {
        this.book = navParams.data.book;
        this.bid = navParams.data.book.bid;

        this.comments = [];

        var ref = new Wilddog("https://plant-book.wilddogio.com/comments");
        ref.orderByChild("bid").equalTo(this.bid).once("value", (snapshot) => {
            snapshot.forEach((data) => {
                console.log(data.key());
                console.log(data.val());
                this.comments.push(data.val());
            });
        });
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
