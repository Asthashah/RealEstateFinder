import { Component, OnInit } from '@angular/core';
import {ApartmentlistService} from '../services/apartmentlist.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-seller-mainpage',
  templateUrl: './seller-mainpage.component.html',
  styleUrls: ['./seller-mainpage.component.css']
})
export class SellerMainpageComponent implements OnInit {

  apartments=[];
  baseFolder:string;
  userName:string;
  propId:string;
  constructor(private aprtServe:ApartmentlistService, private router:Router) { }

  ngOnInit() {

    var userId=localStorage.getItem('userId');
    console.log('inside the  page ' +userId);

    this.aprtServe.getApartmentListByUserName(this.userName).subscribe(apartments=>
      this.apartments=apartments
    );

    this.baseFolder= "../../assets/"+this.userName+"_";
  }

  toCreateProperty(){
    this.router.navigate(['createProperty']);
  }
}
