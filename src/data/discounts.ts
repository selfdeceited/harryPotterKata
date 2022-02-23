import { Discount } from "../models";


export const discounts: Discount[] = [
	{
		description: 'five different books - 25% discount',
		forBooksCount: 5,
		discountRate: 0.25,
		priority: 1,
	},
	{
		description: 'four different books - 20% discount',
		forBooksCount: 4,
		discountRate: 0.2,
		priority: 2,
	},
	{
		description: 'three different books - 10% discount',
		forBooksCount: 3,
		discountRate: 0.1,
		priority: 3,
	},
	{
		description: 'two different books - 5% discount',
		forBooksCount: 2,
		discountRate: 0.05,
		priority: 4,
	},
]
