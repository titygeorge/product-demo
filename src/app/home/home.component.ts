import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BsDatepickerModule  } from 'ngx-bootstrap/datepicker';
import { Data, Details } from  '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	currentDate;
	dateHourVal;
	dateDayVal;
	totalTimeTaken;
	productsAndDeliveryTime = [];
	daysArray = [];
	selectedDay;
	nextDayFirstSlot;

  constructor(private authService: AuthService, private router: Router) { 
  }

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
		 "p_name": "Banana",
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

	delivery_details: Details[] = [
	{
	 "delivery_day":0,
	 "delivery_slots":[
	 "07:00:00",
	 "17:00:00"
	 ]
	 },
	 {
	 "delivery_day":1,
	 "delivery_slots":[
	 "07:00:00",
	 "15:00:00",
	 "20:00:00"
	 ]
	 },
	 {
	 "delivery_day":2,
	 "delivery_slots":[
	 "07:00:00",
	 "14:00:00",
	 "21:00:00"
	 ]
	 },
	  {
	 "delivery_day":3,
	 "delivery_slots":[]
	 },
	  {
	 "delivery_day":4,
	 "delivery_slots":[]
	 },
	 {
	 "delivery_day":5,
	 "delivery_slots":[
	 "06:00:00",
	 "20:00:00"
	 ]
	 },
	 {
	 "delivery_day":6,
	 "delivery_slots":[
	 "10:00:00",
	 "15:00:00"
	 ]
	 }
	]

  ngOnInit() {
  	this.currentDate = new Date()
  	this.dateHourVal = this.currentDate.getHours()
  	this.dateDayVal = new Date(this.currentDate).getDay()
  	this.loadData()
  	this.daysArray.push({id:0, name: "Sunday"}, {id:1, name: "Monday"}, {id:2, name: "Tuesday"}, {id: 3, name: "Wednesday"}, {id:4, name: "Thursday"}, {id:5, name: "Friday"}, {id:6, name: "Saturday"})
  }

  changeDate(event) {
  	this.productsAndDeliveryTime = []
  	var date = event
  	this.dateHourVal = date.getHours()
  	this.dateDayVal = new Date(date).getDay()
  	this.loadData()
  }
  logout(){
    this.authService.logoutFn();
    this.router.navigateByUrl('/login');
  }

  loadData() {
  	let deliveryDayVal;
  	this.data.forEach(element => {
  		if(this.dateDayVal == 2){
  			this.nextDayFirstSlot = this.delivery_details[5].delivery_slots[0];
  			deliveryDayVal = 5

  		} else if(this.dateDayVal == 6) {
  			this.nextDayFirstSlot = this.delivery_details[0].delivery_slots[0];
  			deliveryDayVal = 0

  		} else {
  			this.nextDayFirstSlot = this.delivery_details[this.dateDayVal+1].delivery_slots[0];
  			deliveryDayVal = this.dateDayVal + 1

  		}
  		this.selectedDay = this.delivery_details[this.dateDayVal];
  		if(element) {
  			this.totalTimeTaken = parseInt(element.p_details.preparation_time) + parseInt(this.dateHourVal) + ":00:00";
  			this.productsAndDeliveryTime.push({id: element.p_id, name: element.p_name, preparation_time: this.totalTimeTaken, delivery_time: this.nextDayFirstSlot, deliveryDay: deliveryDayVal})
  		}

  		this.productsAndDeliveryTime.forEach(p_deliveryTime => {
  			this.selectedDay.delivery_slots.forEach(deliverySlotofTheDay => {
				if(p_deliveryTime.preparation_time <= deliverySlotofTheDay) {
					p_deliveryTime.delivery_time = deliverySlotofTheDay
					p_deliveryTime.deliveryDay = this.dateDayVal
				} else {
					p_deliveryTime.delivery_time = this.nextDayFirstSlot
				}
			})
  	
  		})
  	})
  }
}
