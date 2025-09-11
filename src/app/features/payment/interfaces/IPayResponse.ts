export interface Session {
	url: string;
	success_url: string;
	cancel_url: string;
}

export interface IOnlinePaymentResponse {
	status: string;
	session: Session;
}
export interface CartItem {
	count: number;
	_id: string;
	product: string;
	price: number;
}

export interface ShippingAddres {
	details: string;
	phone: string;
	city: string;
}

export interface Data {
	taxPrice: number;
	shippingPrice: number;
	totalOrderPrice: number;
	paymentMethodType: string;
	isPaid: boolean;
	isDelivered: boolean;
	_id: string;
	user: string;
	cartItems: CartItem[];
	shippingAddress: ShippingAddres;
	createdAt: string;
	updatedAt: string;
	id: number;
	__v: number;
}

export interface ICashPaymentResponse {
	status: string;
	data: Data;
}