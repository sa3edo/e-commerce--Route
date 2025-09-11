export interface Metadata {
	currentPage: number;
	numberOfPages: number;
	limit: number;
	nextPage: number;
}

export interface ISubCatData {
	_id: string;
	name: string;
	slug: string;
	category: string;
	createdAt: string;
	updatedAt: string;
}

export interface IGetSubCategories {
	results: number;
	metadata: Metadata;
	data: ISubCatData[];
}