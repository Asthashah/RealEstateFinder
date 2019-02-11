import { Component, OnInit, Input,  OnChanges, SimpleChange } from '@angular/core';
import {ApartmentlistService} from '../services/apartmentlist.service';
import { Apartment } from '../model/apartment';

@Component({
 selector: 'app-edit-property',
 templateUrl: './edit-property.component.html',
 styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {

 @Input() selecId:String;

 apartment:Apartment;
 constructor(private apartmentListService:ApartmentlistService) { }

 ngOnInit() {
 }

 ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
   let changedProp = changes['selecId'];
   let propId = JSON.stringify(changedProp.currentValue);

   this.apartmentListService.getApartment(propId).subscribe(apartment=>this.apartment=apartment);

   console.log(this.apartment);
   let rad = document.getElementById(this.apartment.bed.toString());
   rad.setAttribute("checked", "checked");

   rad=document.getElementById(this.apartment.type.toString());
   rad.setAttribute("checked", "checked");

   let price = document.getElementById("price");
   price['value'] = this.apartment.price;
 }
}
