import {Component} from '@angular/core';
import {NavController, ViewController, NavParams, Toast} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/about/edit.html'
})
export class BookEdit {
    bookList;
    bid;
    constructor(private navCtrl:NavController, private viewCtrl:ViewController, private navParams:NavParams) {
        this.bookList = navParams.data.book;

        var bookref = new Wilddog("https://plant-book.wilddogio.com/books");
        bookref.orderByChild('bookname').equalTo(this.bookList.bookname).once("value", (snapshot) => {
            snapshot.forEach((data) => {
                this.bid = data.val().bid;
            });
        });
    }

    editConfirm(){
        if(this.bookList.bookname == ''){
            let bookNameToast = Toast.create({
                message : '书名不能为空',
                duration : 2000
            });
            this.navCtrl.present(bookNameToast);
        }else if(this.bookList.price == ''){
            let bookPriceToast = Toast.create({
                message : '价格不能为空',
                duration : 2000
            });
            this.navCtrl.present(bookPriceToast);
        }else if(this.bookList.place == ''){
            let bookPlaceToast = Toast.create({
                message : '请选择书籍地区',
                duration : 2000
            });
            this.navCtrl.present(bookPlaceToast);
        }else if(this.bookList.classify == ''){
            let bookClassifyToast = Toast.create({
                message : '请选择书籍类型',
                duration : 2000
            });
            this.navCtrl.present(bookClassifyToast);
        }else if(this.bookList.change == ''){
            let bookChangeToast = Toast.create({
                message : '请选择交换方式',
                duration : 2000
            });
            this.navCtrl.present(bookChangeToast);
        }else if(this.bookList.bookcontent == ''){
            let bookContentToast = Toast.create({
                message : '书籍简介不能为空',
                duration : 2000
            });
            this.navCtrl.present(bookContentToast);
        }else if(this.bookList.image == ''){
            let bookImageToast = Toast.create({
                message : '书籍封面不能为空',
                duration : 2000
            });
            this.navCtrl.present(bookImageToast);
        }else{
            var bookref = new Wilddog("https://plant-book.wilddogio.com/books/" + this.bid);
            bookref.update({
                'bookname' : this.bookList.bookname,
                'price' : this.bookList.price,
                'place' : this.bookList.place,
                'classify' : this.bookList.classify,
                'change' : this.bookList.change,
                'bookcontent' : this.bookList.bookcontent,
                'image' : this.bookList.image
            });
            console.log('success to edit book data');

            this.navCtrl.pop();
        }
    }


    removeBook(){
        var bookref = new Wilddog("https://plant-book.wilddogio.com/books/" + this.bid);
        bookref.remove();
        console.log('success to remove the book');

        this.navCtrl.pop();
    }
}
