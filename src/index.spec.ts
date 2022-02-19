import { OrderItem, calculateCost } from '.'

describe('when buying the Harry Potter books', () => {
	it('one book should cost 8 pounds', () => {
		// arrange
		const order: OrderItem[] = [{ book: 'Order of Phoenix', quantity: 1 }]
		// act
		const check = calculateCost(order)
		// assert
		expect(check.finalPrice).toBe(8)
	})
	it('two same books should cost 16 pounds', () => {
		// arrange
		const order: OrderItem[] = [{ book: 'Chamber Of Secrets', quantity: 2 }]
		// act
		const check = calculateCost(order)
		// assert
		expect(check.finalPrice).toBe(8 * 2)
	})
	it('one pair and another should cost 16 pounds with 5% discount for both', () => {
		// arrange
		const order: OrderItem[] = [
			{ book: 'Chamber Of Secrets', quantity: 2 },
			{ book: 'Philosophers Stone', quantity: 2 },
		]
		// act
		const check = calculateCost(order)
		// assert
		expect(check.finalPrice).toBe(8 * 2 * 2 * (1 - 0.05))
	})
	it('five same books + three same books should cost 51.6 pounds', () => {
		// arrange
		const order: OrderItem[] = [
			{ book: 'Philosophers Stone', quantity: 2 },
			{ book: 'Chamber Of Secrets', quantity: 2 },
			{ book: 'Prisoner of Azkaban', quantity: 2 },
			{ book: 'Goblet of Fire', quantity: 1 },
			{ book: 'Order of Phoenix', quantity: 1 },
		]
		// act
		const check = calculateCost(order)
		// assert
		expect(check.finalPrice).toBe(8 * 5 * (1 - 0.25) + 8 * 3 * (1 - 0.1))
	})
	it('max discount can be applied multiple times', () => {
		// arrange
		const order: OrderItem[] = [
			{ book: 'Philosophers Stone', quantity: 4 },
			{ book: 'Chamber Of Secrets', quantity: 4 },
			{ book: 'Prisoner of Azkaban', quantity: 4 },
			{ book: 'Goblet of Fire', quantity: 4 },
			{ book: 'Order of Phoenix', quantity: 4 },
		]
		// act
		const check = calculateCost(order)
		// assert
		expect(check.finalPrice).toBe(8 * 5 * 4 * (1 - 0.25))
	})
})
