export interface Metadata {
	currentPage: number;
	numberOfPages: number;
	limit: number;
	nextPage: number;
}

export interface IAllBrandsData {
	_id: string;
	name: string;
	slug: string;
	image: string;
	createdAt: string;
	updatedAt: string;
}

export interface IGetAllBrands {
	results: number;
	metadata: Metadata;
	data: IAllBrandsData[];
}