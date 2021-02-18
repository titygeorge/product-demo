import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface Item {
    preparation_time: string
}

interface Data {

     p_name: string,
	 p_id: number,
	 p_cost: number,
	 p_availability: number,
	 p_details: Item 
   

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  data: Data[]  = [
		 {
		 "p_name": "Apple",
		 "p_id": 1,
		 "p_cost": 30,
		 "p_availability": 1,
		 "p_details": {"preparation_time":"5"}
		 },
		 {
		 "p_name": "Mango",
		 "p_id": 2,
		 "p_cost": 50,
		 "p_availability": 1,
		 "p_details": {"preparation_time":"2"}
		  },
		 {
		 "p_name": "Bananna",
		 "p_id": 3,
		 "p_cost": 5,
		 "p_availability": 0,
		 "p_details": {"preparation_time":"1"}
		 },
		 {
		 "p_name": "Orange",
		 "p_id": 4,
		 "p_cost": 25,
		 "p_availability": 1,
		 "p_details": {"preparation_time":"8"}
		 }
		]

  ngOnInit() {

  }

  logout(){
    this.authService.logoutFn();
    this.router.navigateByUrl('/login');
  }

 //  loadData() {
  	
	// }	

}
