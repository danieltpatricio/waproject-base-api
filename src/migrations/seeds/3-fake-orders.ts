import * as faker from 'faker/locale/pt_BR';
import * as Knex from 'knex';

import { IOrder } from '../../server/interfaces/models/order';
import { IS_DEV } from '../../server/settings';

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  const orders = await knex
    .count()
    .from('Order')
    .first();

  if (Number(orders.count) !== 0) return;

  for (let x = 0; x < 100; x++) {
    const description = faker.commerce.productName();
    const price = parseFloat(faker.commerce.price());
    const quantity = faker.random.number({ min: 0, max: 50 });

    const order: IOrder = {
      description,
      price,
      quantity,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    await knex.insert(order).into('Order');
  }
}