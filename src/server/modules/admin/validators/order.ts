import { IOrder } from 'interfaces/models/order';
import { joi, validateAsPromise } from 'validators';

const schema = joi.object().keys({
  id: joi.number().min(1),
  description: joi.string().trim().required().min(3).max(50),
  quantity: joi.number().min(1).max(50),
  price: joi.number().min(0),
});

export function validate(model: any): Promise<IOrder> {
  return validateAsPromise<any>(model, schema);
}