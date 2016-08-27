import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/home/search.html'
})
export class SearchPage {
    location;
    type;
    change;

    constructor(private navCtrl:NavController, private viewCtrl:ViewController) {
        this.location = "";
        this.type = "";
        this.change = "";
    }

    //搜索栏内容
    getItems(event) {
        var val = event.target.value;
        console.log(val);
    }

    //搜索功能
    search() {
        console.log(this.location);
        console.log(this.type);
        console.log(this.change);
        this.viewCtrl.dismiss();
    }

    cancel() {
        this.viewCtrl.dismiss();
    }
}
