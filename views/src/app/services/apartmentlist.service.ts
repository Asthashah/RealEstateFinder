import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Apartment} from '../model/apartment';
import 'rxjs/add/operator/map';



@Injectable()
export class ApartmentlistService {


  constructor(private http: Http) { }

         //getting apartmentservice
         getApartmentlist(){

          return this.http.get('http://localhost:3000/zillow/apartmentlist').map(res=>res.json());
     }


     getApartmentListByUserName(username){
       return this.http.get('http://localhost:3000/zillow/apartmentlist/'+username).map(res=>res.json());
     }

     getApartment(_id:string){

      return this.http.get('http://localhost:3000/zillow/apartmentlist1/'+_id).map(res=>res.json());
 }

 filterProperties(param = ''){
  return this.http.get('http://localhost:3000/zillow/apartmentfilter' + param ).map(res=>res.json());
}

deleteApartment(_id:string){
  return this.http.delete('http://localhost:3000/zillow/apartmentlist/'+_id).map(res=>res.json());
}

}
