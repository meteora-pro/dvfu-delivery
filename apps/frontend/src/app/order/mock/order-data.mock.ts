import { LocalOrderData } from '../store/order.model';

export const shopListMock = [{
  id: 1,
  name: 'МегаОпт',
  address: ' ул. Героев-тихоокеанцев, 5а',
  description: 'Хорошие цены'
}, {
  id: 2,
  name: 'Самбери',
  address: 'ул. Калинина, 8',
  description: 'Большой выбор товаров'
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
  orderPositionList: [
    {title: 'Шоколад', maxCost: 100},
    {title: 'Кола 2л', maxCost: 120},
    {title: 'Макароны макфа 2 пачки', maxCost: 100},
    {title: 'Огурцы 500грамм', maxCost: 150},
  ],
};
