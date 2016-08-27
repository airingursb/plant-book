import {Component} from '@angular/core';
import {NavController, ViewController, Toast, Loading} from 'ionic-angular';

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
        if (this.bookList.bookName == '') {
            var bookNameToast = Toast.create({
                message: '书名不能为空',
                duration: 2000
            });
            this.navCtrl.present(bookNameToast);
        } else if (this.bookList.bookPrice == '') {
            var bookPriceToast = Toast.create({
                message: '书籍价格不能为空',
                duration: 2000
            });
            this.navCtrl.present(bookPriceToast);
        } else if (this.bookList.bookLocation == '') {
            var bookLocationToast = Toast.create({
                message: '地区不能为空',
                duration: 2000
            });
            this.navCtrl.present(bookLocationToast);
        } else if (this.bookList.bookType == '') {
            var bookTypeToast = Toast.create({
                message: '请选择书籍类型',
                duration: 2000
            });
            this.navCtrl.present(bookTypeToast);
        } else if (this.bookList.bookChange == '') {
            var bookChangeToast = Toast.create({
                message: '请选择书籍交换方式',
                duration: 2000
            });
            this.navCtrl.present(bookChangeToast);
        } else if (this.bookList.bookContent == '') {
            var bookContentToast = Toast.create({
                message: '书籍简介不能为空',
                duration: 2000
            });
            this.navCtrl.present(bookContentToast);
        } else {
            var createBookLoading = Loading.create({
                spinner: 'circles',
                content: '正在上传'
            });
            this.navCtrl.present(createBookLoading);

            var ref = new Wilddog("https://plant-book.wilddogio.com");
            var authData = ref.getAuth();
            if(authData) {
                this.createBook(authData.uid);
            } else {
                var authToast = Toast.create({
                    message: '请先登录',
                    duration: 2000
                });
                this.navCtrl.present(authToast);
            }


            setTimeout(()=> {
                this.viewCtrl.dismiss();
                createBookLoading.dismiss();
            }, 2000);
        }
    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    createBook(uid:string) {
        var setBookList = new Wilddog('https://plant-book.wilddogio.com/books/' + this.uuid());
        var userref = new Wilddog("https://plant-book.wilddogio.com/users/" + uid);
        userref.once('value', nameSnapshot => {
            var val = nameSnapshot.val();
            setBookList.child('fromusername').set(val.username);
            setBookList.child('fromuserimage').set(val.image);
        });
        setBookList.child('bookname').set(this.bookList.bookName);
        setBookList.child('bookcontent').set(this.bookList.bookContent);
        setBookList.child('fromuid').set(uid);
        setBookList.child('touid').set('');
        setBookList.child('tousername').set('');
        setBookList.child('touserimage').set('');
        setBookList.child('image').set('http://airing.ursb.me/image/plant/1.jpg');
        setBookList.child('place').set(this.bookList.bookLocation);
        setBookList.child('status').set('等待交易');
        setBookList.child('price').set(this.bookList.bookPrice);
        setBookList.child('classify').set(this.bookList.bookType);
        setBookList.child('change').set(this.bookList.bookChange);
        console.log('success');
    }

    /**
     * 随机生成bid
     * @returns {string}
     */
    uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }
}
