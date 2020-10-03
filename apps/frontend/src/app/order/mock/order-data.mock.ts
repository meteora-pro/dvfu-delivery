import { LocalOrderData } from '../store/order.model';

export const shopListMock = [{
  id: 1,
  name: 'Три березки',
  address: 'Мегаполи Черниговка',
  description: 'Норм магаз'
}, {
  id: 2,
  name: 'Три березки 12',
  address: 'Мегаполи Черниговка 12',
  description: 'Норм магаз 2'
}];

export const expiredTimeList = [{
  title: '15 минут',
  minutes: 15,
}, {
  title: '30 минут',
  minutes: 30,
}, {
  title: '1 час',
  minutes: 60,
}];

export const defaultOrderPositionsData: LocalOrderData = {
  deliveryTo: 'Кампус ДВФУ',
  shopId: 1,
  expiredTime: 15,
  orderPositionList: [{title: 'Test', maxCost: 500}, {title: 'Огурцы', maxCost: 250}],
};
