import { Discount, Id, PricedOrder } from './models'

export class Discounter {
	constructor(private discount: Discount) {}

	public canApply(pricedOrder: PricedOrder): { applyAllowed: boolean; ids?: Id[] } {
		const orderItemsWithoutDiscount = pricedOrder.filter(o => o.discount === 0)
		const orderItemsWithoutDuplicates: PricedOrder = []
		for (const orderItem of orderItemsWithoutDiscount) {
			if (!orderItemsWithoutDuplicates.some(x => x.book == orderItem.book)) {
				orderItemsWithoutDuplicates.push(orderItem)
			}
		}

		if (orderItemsWithoutDuplicates.length === this.discount.forBooksCount) {
			return { applyAllowed: true, ids: orderItemsWithoutDuplicates.map(x => x.id) }
		}

		return { applyAllowed: false }
	}

	public apply(pricedOrder: PricedOrder, ids: Id[]): PricedOrder {
		return pricedOrder.map(x => (ids.includes(x.id) ? { ...x, discount: this.discount.discountRate } : { ...x }))
	}
}
