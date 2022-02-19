import { Discounter } from './Discounter'
import { DiscountRate, currentDiscounts } from './discount'

export type OrderItem = { book: Book; quantity: number }
export type Price = number
export type Check = { finalPrice: Price }

type Book =
	| 'Philosophers Stone'
	| 'Chamber Of Secrets'
	| 'Prisoner of Azkaban'
	| 'Goblet of Fire'
	| 'Order of Phoenix'
	| 'Half-blood Prince'
	| 'Deathly Hollows Pt.1'
	| 'Deathly Hollows Pt.2'

type PricedFlatOrderItem = Omit<OrderItem, 'quantity'> & {
	price: Price
	discount: DiscountRate
	id: Id
}

export type PricedOrder = Array<PricedFlatOrderItem>
export type Id = Symbol

const getTotalPrice = (order: PricedOrder): Price =>
	order.map(x => x.price * (1 - x.discount)).reduce((p, x) => p + x, 0)

const flattenOrder = (order: OrderItem[], priceForOneBook: number): PricedOrder =>
	order
		.flatMap(x => Array(x.quantity).fill({ book: x.book }))
		.map(x => ({
			...x,
			price: priceForOneBook,
			discount: 0,
			id: Symbol(),
		}))

export function calculateCost(order: OrderItem[]): Check {
	const priceForOneBook = 8

	let pricedOrder = flattenOrder(order, priceForOneBook)

	currentDiscounts
		.sort((a, b) => a.priority - b.priority)
		.forEach(discount => {
			const discounter = new Discounter(discount)
			while (true) {
				const { canApply, ids } = discounter.canApply(pricedOrder)
				if (canApply) {
					pricedOrder = discounter.apply(pricedOrder, ids!)
				} else {
					break
				}
			}
		})

	return { finalPrice: getTotalPrice(pricedOrder) }
}
