export interface IBrandDAta {
	_id: string;
	name: string;
	slug: string;
	image: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface IBrand {
	data: IBrandDAta;
}