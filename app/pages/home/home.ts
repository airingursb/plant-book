/// <reference path="../contact/wilddog.d.ts" />
import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {BookDetails} from './bookdetails';
import {SearchPage} from './search';
import {CreatePage} from './create';
import 'wilddog';

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    private bookList:any;
    private book:any;

    constructor(private navCtrl:NavController) {

        this.bookList = [];
        this.book = {};
        this.book.bookName = "";

        var ref = new Wilddog("https://plant-book.wilddogio.com/books");
        ref.orderByChild("bookname").once("value", (snapshot) => {
            snapshot.forEach((data) => {
                console.log(data.key());
                console.log(data.val());
                this.bookList.push(data.val());
            });
        });

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
