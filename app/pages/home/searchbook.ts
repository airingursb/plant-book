import {Component} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import {BookDetails} from '../home/bookdetails';

@Component({
    templateUrl: 'build/pages/home/searchbook.html'
})
export class SearchBookPage {
    bookList;
    constructor(private navCtrl:NavController, private viewCtrl:ViewController, private params:NavParams) {
        this.bookList = [];

        this.bookList = params.data;
        console.log(params.data);
    }

    bookDetailClick(event, book) {
        this.navCtrl.push(BookDetails, {book: book});
    }
}
