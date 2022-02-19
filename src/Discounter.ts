import { Id, PricedOrder } from '.'
import { Discount } from './discount'

export class Discounter {
	constructor(private discount: Discount) {}

	public canApply(pricedOrder: PricedOrder): { canApply: boolean; ids?: Id[] } {
		const orderItemsWithoutDiscount = pricedOrder.filter(o => o.discount === 0)
		const orderItemsWithoutDuplicates: PricedOrder = []
		for (const orderItem of orderItemsWithoutDiscount) {
			if (!orderItemsWithoutDuplicates.map(x => x.book).includes(orderItem.book)) {
				orderItemsWithoutDuplicates.push(orderItem)
			}
		}

		if (orderItemsWithoutDuplicates.length === this.discount.booksCount) {
			return { canApply: true, ids: orderItemsWithoutDuplicates.map(x => x.id) }
		}

		return { canApply: false }
	}
	public apply(pricedOrder: PricedOrder, ids: Id[]): PricedOrder {
		return pricedOrder.map(x => (ids.includes(x.id) ? { ...x, discount: this.discount.discountRate } : { ...x }))
	}
}
