export type Book =
| 'Philosopher\'s Stone'
| 'Chamber Of Secrets'
| 'Prisoner Of Azkaban'
| 'Goblet Of Fire'
| 'Order Of Phoenix'
| 'Half-Blood Prince'
| 'Deathly Hallows Pt.1'
| 'Deathly Hallows Pt.2'

export type RawOrderItem = { book: Book; quantity: number }
export type RawOrder = RawOrderItem[]

export type Price = number
export type Check = { finalPrice: Price }

export type OrderItem = Omit<RawOrderItem, 'quantity'> & {
	price: Price
	discount: DiscountRate
	id: Id
}

export type PricedOrder = Array<OrderItem>
export type Id = Symbol

export type DiscountRate = 0 | 0.05 | 0.1 | 0.2 | 0.25
export type Priority = 1 | 2 | 3 | 4

export type Discount = {
	description: string
	forBooksCount: number
	discountRate: DiscountRate
	priority: Priority
}

