import { Check, Discount, Price, PricedOrder, RawOrder } from './types'

import { Discounter } from './Discounter'

export class CashRegister {
	constructor(private discounts: Discount[], private priceForOneBook = 8) {}

	public checkout(order: RawOrder): Check {
		let pricedOrder = this.preparePricedOrder(order)

		this.discounts
			.sort((a, b) => a.priority - b.priority)
			.forEach(discount => {
				const discounter = new Discounter(discount)
				pricedOrder = this.applyDiscount(pricedOrder, discounter)
			})

		const finalPrice = this.calculatePriceForOrder(pricedOrder)
		return { finalPrice }
	}

	private applyDiscount(pricedOrder: PricedOrder, discounter: Discounter): PricedOrder {
		const { applyAllowed, ids } = discounter.canApply(pricedOrder)
		if (!applyAllowed) {
			return pricedOrder
		}
		pricedOrder = discounter.apply(pricedOrder, ids!)
		return this.applyDiscount(pricedOrder, discounter)
	}

	private preparePricedOrder(order: RawOrder): PricedOrder {
		return order
			.flatMap(x => Array(x.quantity).fill({ book: x.book }))
			.map(x => ({
				...x,
				price: this.priceForOneBook,
				discount: 0,
				id: Symbol(),
			}))
	}

	private calculatePriceForOrder(order: PricedOrder): Price {
		return order.map(x => x.price * (1 - x.discount)).reduce((p, x) => p + x, 0)
	}
}
