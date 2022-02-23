import { Discount } from "../models";


export const discounts: Discount[] = [
	{
		name: 'five different books - 25% discount',
		forBooksCount: 5,
		discountRate: 0.25,
		priority: 1,
	},
	{
		name: 'four different books - 25% discount',
		forBooksCount: 4,
		discountRate: 0.2,
		priority: 2,
	},
	{
		name: 'three different books - 25% discount',
		forBooksCount: 3,
		discountRate: 0.1,
		priority: 3,
	},
	{
		name: 'two different books - 25% discount',
		forBooksCount: 2,
		discountRate: 0.05,
		priority: 4,
	},
]
