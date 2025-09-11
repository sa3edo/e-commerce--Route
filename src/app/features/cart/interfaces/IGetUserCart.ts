export interface Subcategory {
	_id: string;
	name: string;
	slug: string;
	category: string;
}

export interface Category {
	_id: string;
	name: string;
	slug: string;
	image: string;
}

export interface Brand {
	_id: string;
	name: string;
	slug: string;
	image: string;
}

export interface IProduct {
	subcategory: Subcategory[];
	_id: string;
	title: string;
	quantity: number;
	imageCover: string;
	category: Category;
	brand: Brand;
	ratingsAverage: number;
	id: string;
}

export interface ICartProduct {
	count: number;
	_id: string;
	product: IProduct;
	price: number;
}

export interface IUserCartData {
	_id: string;
	cartOwner: string;
	products: ICartProduct[];
	createdAt: string;
	updatedAt: string;
	__v: number;
	totalCartPrice: number;
}

export interface IGetUserCart {
	status: string;
	numOfCartItems: number;
	cartId: string;
	data: IUserCartData;
}