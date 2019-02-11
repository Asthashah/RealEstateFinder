import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'angular-2-dropdown/mk-dropdown/dropdown.module';
import {ApartmentlistService} from '../services/apartmentlist.service';
import {Apartment} from '../model/apartment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import {ApartmentdetailsComponent} from '../apartmentdetails/apartmentdetails.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
 

@Component({
  selector: 'app-apartmentlist',
  templateUrl: './apartmentlist.component.html',
  styleUrls: ['./apartmentlist.component.css'],
  providers:[ApartmentlistService]
})
export class ApartmentlistComponent implements OnInit {

  bsModalRef: BsModalRef;
  apartments:Apartment[]=[];
  apartment: Apartment;
  user_name:String;
  price:String;
  bed:String;
  bath:String;
  type:String;
  imgsrc:String;
  zip:String;
  address:String;
  filteredApartments:Apartment[]=[];
  checkedList_hometype=[];
  //selectedEntry_beds;
  //selectedEntry_hometype;
  selectedEntry_beds:String;
  selectedEntry_hometype:String;
  selectedEntry_minprice:String;
  selectedEntry_maxprice:String;
  selectedEntry_bath:String;
  bedlist = [
    { id: 1,value: '1 BHK' },
    { id: 2,value: '2 BHK' },
    { id: 3,value: '3 BHK'},
    { id: 4,value: '4 BHK'},
    {id: 5,value: '5 BHK & ABOVE'} ];
  hometype = [
    { id: 1,value: 'HOUSES'},
    { id: 2,value: 'APARTMENTS' },
    { id: 3,value: 'CONDOS'},
    { id: 4,value: 'TOWNHOMES'}];
 
  filter={
    bed:String,
    house:[]

  }
  price_min= [
    {id: 1, value: '0' },
    {id: 2, value: '$50,000+' },
    {id: 3, value: '$100,000+' },
    {id: 4, value: '$200,000+'},
    {id: 5, value: '$300,000+'},
    {id: 6, value: '$400,000+'},
    {id: 7, value: '$500,000+'}
  ];
  price_max= [
  
    {id: 1, value: '$50,000+' },
    {id: 2, value: '$100,000+' },
    {id: 2, value: '$200,000+'},
    {id: 4, value: '$300,000+'},
    {id: 5, value: '$400,000+'},
    {id: 6, value: '$500,000+'},
    {id: 5, value: '$900,000+'}
  ];
  bathlist= [
     {id: 1, value: '0' },
    {id: 2, value: '1' },
    {id: 3, value: '2' },
    {id: 4, value: '3'},
    {id: 5, value: '4'},
    {id: 6, value: '5'},
    {id: 7, value: '5+'}
  ];

  
  constructor(private apartmentListService:ApartmentlistService, private modalService: BsModalService) { } //private modalService: NgbModal,
  ngOnInit() {

    //this.apartmentListService.getApartmentlist().subscribe(apartments=>this.apartments=apartments);
    //this.apartmentListService.getApartment('5ad06a8d39b5c5c3598d9226').subscribe(apartment=>this.apartment=apartment);
    this.selectedEntry_minprice="0";
    this.selectedEntry_maxprice="$50,000+";
  }

  getdata(name:any,name1:any){
    console.log("name"+name+"name1"+name1);
    this.apartmentListService.getApartmentlist().subscribe(apartments=>this.apartments=apartments);
    for(var i=0;i<this.apartments.length;i++){
    if(this.apartments[i].bed==name1 && this.apartments[i].type==name ){
        console.log(this.apartments[i].user_name);
       this.filteredApartments.push(this.apartments[i]);

    }

    }
  }
  

  //var slider = document.getElementById("myRange");
  onCheckboxChange(option, event) {
    if(event.target.checked) {
     // this.checkedList_hometype.push(option.value);
     this.filter.house.push(option.value);
    } else {
      for(var i=0 ; i < this.hometype.length; i++) {
       // if(this.checkedList_hometype[i] == option.value){
        if(this.filter.house[i] == option.value){
          //this.checkedList_hometype.splice(i,1);
          this.filter.house.splice(i,1);
        }
      }
    }
    console.log(this.filter.house);
    } 

    onSort(){
      if((<HTMLInputElement>document.getElementById("sort")).value=="Price | Low-High") {
        this.priceAsc();
        console.log(this.apartments);
      }
      else{
        this.priceDesc();
      }
    }
    priceDesc(){
      this.apartments.sort(function(a:Apartment,b:Apartment){
        if(a.price > b.price){
          return -1;
        }
        if(a.price < b.price){
          return 1;
        }
        return 0;
      });
    }
   
    priceAsc(){
      this.apartments.sort(function(a:Apartment,b:Apartment){
        if(a.price < b.price){
          return -1;
        }
        if(a.price > b.price){
          return 1;
        }
        return 0;
      });
    }

    onSelectionChange(entry) {
       // this.selectedEntry_beds = entry;
       this.selectedEntry_beds = entry.value;
       // this.filter.bed=entry.value;
        //console.log(this.selectedEntry_beds.value);
        console.log(this.selectedEntry_beds);
    }

    onSelectionChange_hometype(entry) {
      //this.selectedEntry_beds = entry;
      this.selectedEntry_hometype = entry.value;
     // this.filter.bed=entry.value;
      //console.log(this.selectedEntry_beds.value);
      console.log(this.selectedEntry_hometype);
     }

     onSelectionChange_pricemin(val:any) {

      this.selectedEntry_minprice=val;
      console.log(this.selectedEntry_minprice);

     }
     onSelectionChange_pricemax(maxval:any) {

      this.selectedEntry_maxprice=maxval;
      console.log(this.selectedEntry_maxprice);

     }
     onSelectionChange_bath(bath:any) {

      this.selectedEntry_bath=bath;
      console.log(this.selectedEntry_maxprice);

     }

     openloginModal(){    
      //const modalRef = this.modalService.open(ApartmentdetailsComponent, { size: 'lg' });
    //  this.bsModalRef = this.modalService.show(ApartmentdetailsComponent); //, {initialState}
    this.bsModalRef.content.closeBtnName = 'Close';
    }
  
    
}