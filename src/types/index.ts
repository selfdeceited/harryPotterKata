type DiscountRate = 0 | 0.05 | 0.1 | 0.2 | 0.25
type Priority = 1 | 2 | 3 | 4

type Book =
| 'Philosopher\'s Stone'
| 'Chamber Of Secrets'
| 'Prisoner Of Azkaban'
| 'Goblet Of Fire'
| 'Order Of Phoenix'
| 'Half-Blood Prince'
| 'Deathly Hallows Pt.1'
| 'Deathly Hallows Pt.2'

type RawOrderItem = { book: Book; quantity: number }
type OrderItem = Omit<RawOrderItem, 'quantity'> & {
	price: Price
	discount: DiscountRate
	id: Id
}

export type Price = number
export type Id = Symbol

export type RawOrder = RawOrderItem[]
export type PricedOrder = Array<OrderItem>
export type Check = { finalPrice: Price }

export type Discount = {
	description: string
	forBooksCount: number
	discountRate: DiscountRate
	priority: Priority
}

