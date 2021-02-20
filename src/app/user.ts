export interface User {
	email: string;
    password: string;
}

interface Item {
    preparation_time: string
}

export interface Data {
     p_name: string,
	 p_id: number,
	 p_cost: number,
	 p_availability: number,
	 p_details: Item 
}

export interface Details {
	delivery_day: number,
	delivery_slots: string[]
}