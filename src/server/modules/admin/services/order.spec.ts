import { connectAndMigrate, Connection } from 'db';
import { ServiceError } from 'errors/service';
import { IOrder } from 'interfaces/models/order';
import { Order } from 'models/order';

import * as service from './order';

describe('admin/services/order', () => {
  let connection: Connection;

  const order: IOrder = {
    id: 1,
    description: `Teste de pedidos ${Date.now()}`,
    quantity: 5,
    price: 10.5
  };

  beforeAll(async () => connection = await connectAndMigrate());
  afterAll(() => connection.destroy());

  it('should create a new order', async () => {
    const data: IOrder = {
      ...order,
      id: null
    };

    return service.save(data).then((order: Order) => {
      expect(order).not.toBeUndefined();
      expect(order.createdDate).toBeDate();
      expect(order.createdDate.getTime()).not.toBeNaN();
    });
  });

  it('should allow to update the order', async () => {
    const data: IOrder = {
      ...order,
      description: `Teste de pedidos ${Date.now()} New`
    };

    return service.save(data).then((order: Order) => {
      expect(order).not.toBeUndefined();
      expect(order.id).toEqual(data.id);
      expect(order.description).toEqual(data.description);
    });
  });

  it('should allow remove a order', async () => {
    return expect(service.remove(order.id)).toResolve() as any;
  });

  it('should not allow update not found order', async () => {
    const data: IOrder = {
      ...order,
      id: order.id + 1,
    };
    const promise = service.save(data);
    await expect(promise).toReject();

    const err: Error = await promise.catch(err => err);
    expect(err instanceof ServiceError).toBeTrue();
    expect(err.message).toEqual('not-found');
  });
});