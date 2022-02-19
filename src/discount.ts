export type DiscountRate = 0 | 0.05 | 0.1 | 0.2 | 0.25
type Priority = 1 | 2 | 3 | 4

export type Discount = {
	name: string
	booksCount: number
	discountRate: DiscountRate
	priority: Priority
}

export const currentDiscounts: Discount[] = [
	{
		name: 'five different books - 25% discount',
		booksCount: 5,
		discountRate: 0.25,
		priority: 1,
	},
	{
		name: 'four different books - 25% discount',
		booksCount: 4,
		discountRate: 0.2,
		priority: 2,
	},
	{
		name: 'three different books - 25% discount',
		booksCount: 3,
		discountRate: 0.1,
		priority: 3,
	},
	{
		name: 'two different books - 25% discount',
		booksCount: 2,
		discountRate: 0.05,
		priority: 4,
	},
]
