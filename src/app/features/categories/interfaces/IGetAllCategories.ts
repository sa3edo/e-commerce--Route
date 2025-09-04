export interface Metadata {
	currentPage: number;
	numberOfPages: number;
	limit: number;
}

export interface ICategoriesData {
	_id: string;
	name: string;
	slug: string;
	image: string;
	createdAt: string;
	updatedAt: string;
}

export interface IGetAllCategoris {
	results: number;
	metadata: Metadata;
	data: ICategoriesData[];
}