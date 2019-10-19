import { IOrder } from 'interfaces/models/order';
import * as joi from 'joi';
import * as lodash from 'lodash';

import { validate } from './order';
// Fazer para orders
describe('admin/validators/order', () => {
  const order: IOrder = {
    id: 1,
    description: `Teste de pedidos ${Date.now()}`,
    quantity: 5,
    price: 10.5
  };

  it('should return valid object', async () => {
    const model = order;
    return expect(validate(model)).toResolve();
  });

  it('should return invalid when id is less than 1', async () => {
    const model = lodash.clone(order);
    model.id = 0;
    const promise = validate(model);
    await expect(promise).toReject();

    const data: joi.CustomValidationError = await promise.catch(err => err);
    expect(data.validationError).toBeTrue();
    expect(data.message).toHaveLength(1);
    expect(data.message[0].path).toEqual('id');
    expect(data.message[0].type).toEqual('number.min');
  });

  it('should return invalid when description is empty', async () => {
    const model = lodash.clone(order);
    delete model.description;
    const promise = validate(model);
    await expect(promise).toReject();

    const data: joi.CustomValidationError = await promise.catch(err => err);
    expect(data.validationError).toBeTrue();
    expect(data.message).toHaveLength(1);
    expect(data.message[0].path).toEqual('description');
    expect(data.message[0].type).toEqual('any.required');
  });

  it('should return invalid when description length is less than 3', async () => {
    const model = lodash.clone(order);
    model.description = 'te';
    const promise = validate(model);
    await expect(promise).toReject();

    const data: joi.CustomValidationError = await promise.catch(err => err);
    expect(data.validationError).toBeTrue();
    expect(data.message).toHaveLength(1);
    expect(data.message[0].path).toEqual('description');
    expect(data.message[0].type).toEqual('string.min');
  });

  it('should return invalid when description length is greather than 50', async () => {
    const model = lodash.clone(order);
    model.description = new Array(52).join('a');
    const promise = validate(model);
    await expect(promise).toReject();

    const data: joi.CustomValidationError = await promise.catch(err => err);
    expect(data.validationError).toBeTrue();
    expect(data.message).toHaveLength(1);
    expect(data.message[0].path).toEqual('description');
    expect(data.message[0].type).toEqual('string.max');
  });

  it('should return invalid when quantity length is greather than 50', async () => {
    const model = lodash.clone(order);
    model.quantity = 51;
    const promise = validate(model);
    await expect(promise).toReject();

    const data: joi.CustomValidationError = await promise.catch(err => err);
    expect(data.validationError).toBeTrue();
    expect(data.message).toHaveLength(1);
    expect(data.message[0].path).toEqual('quantity');
    expect(data.message[0].type).toEqual('number.max');
  });

  it('should return invalid when description is empty', async () => {
    const model = lodash.clone(order);
    delete model.description;
    const promise = validate(model);
    await expect(promise).toReject();

    const data: joi.CustomValidationError = await promise.catch(err => err);
    expect(data.validationError).toBeTrue();
    expect(data.message).toHaveLength(1);
    expect(data.message[0].path).toEqual('description');
    expect(data.message[0].type).toEqual('any.required');
  });

  it('should return invalid when description length is greather than 150', async () => {
    const model = lodash.clone(order);
    model.description = new Array(152).join('a');
    const promise = validate(model);
    await expect(promise).toReject();

    const data: joi.CustomValidationError = await promise.catch(err => err);
    expect(data.validationError).toBeTrue();
    expect(data.message.some(m => m.path == 'description' && m.type == 'string.max')).toBeTrue();
  });

});