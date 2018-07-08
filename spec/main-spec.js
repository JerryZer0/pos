'use strict';

const { findKinds, findCount, findTable, getPromotion, calculateSubtotalAndAmount, generateReceipt} = require('../main/main')

  const tags = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2.5',
    'ITEM000005',
    'ITEM000005-2',
  ];

//   const expectText = '["ITEM000001","ITEM000003","ITEM000005"]';

//   it('it should print text', () => {
//     const buy_items = findKinds(tags);
//     const buy_items_array = Array.from(buy_items);
//     expect((JSON.stringify(buy_items_array)).toEqual(expectText));
//   });

describe('function findKinds() test', () => {

  const expectText = '["ITEM000001","ITEM000003","ITEM000005"]';
  it('it should return the right result', () => {

    const buy_items = findKinds(tags);
    const buy_items_array = Array.from(buy_items)
    
    expect(JSON.stringify(buy_items_array)).toEqual(expectText);
  });
});

describe('function findCount() test', () => {

  const kinds = ["ITEM000001","ITEM000003","ITEM000005"];
  const expectText = '[{"barcode":"ITEM000001","count":5},{"barcode":"ITEM000003","count":2.5},{"barcode":"ITEM000005","count":3}]';

  it('it should return the right result', () => {
    
    const items = findCount(tags,kinds);
    expect(JSON.stringify(items)).toEqual(expectText);
  });
});

describe('function findTable() test', () => {

  const items = [{"barcode":"ITEM000001","count":5},{"barcode":"ITEM000003","count":2.5},{"barcode":"ITEM000005","count":3}];
  const expectText = '[{"barcode":"ITEM000001","name":"雪碧","count":5,"unit":"瓶","price":3},{"barcode":"ITEM000003","name":"荔枝","count":2.5,"unit":"斤","price":15},{"barcode":"ITEM000005","name":"方便面","count":3,"unit":"袋","price":4.5}]';

  it('it should return the right result', () => {

    const itemList = findTable(items);
    expect(JSON.stringify(itemList)).toEqual(expectText);
  });
});

describe('function getPromotion() test', () => {

  const expectText = '[{"barcode":"ITEM000001","name":"雪碧","count":5,"unit":"瓶","price":3,"countAfterPromote":4,"subTotal":12},{"barcode":"ITEM000003","name":"荔枝","count":2.5,"unit":"斤","price":15,"countAfterPromote":2.5,"subTotal":37.5},{"barcode":"ITEM000005","name":"方便面","count":3,"unit":"袋","price":4.5,"countAfterPromote":2,"subTotal":9}]';
  const itemList = [{"barcode":"ITEM000001","name":"雪碧","count":5,"unit":"瓶","price":3},{"barcode":"ITEM000003","name":"荔枝","count":2.5,"unit":"斤","price":15},{"barcode":"ITEM000005","name":"方便面","count":3,"unit":"袋","price":4.5}];
  it('it should return the right result', () => {
    const receiptBase = getPromotion(itemList);
    expect(JSON.stringify(receiptBase)).toEqual(expectText);
  });
});

describe('function calculateSubtotalAndAmount() test', () => {
  const receiptBase = [{"barcode":"ITEM000001","name":"雪碧","count":5,"unit":"瓶","price":3,"countAfterPromote":4,"subTotal":12},{"barcode":"ITEM000003","name":"荔枝","count":2.5,"unit":"斤","price":15,"countAfterPromote":2.5,"subTotal":37.5},{"barcode":"ITEM000005","name":"方便面","count":3,"unit":"袋","price":4.5,"countAfterPromote":2,"subTotal":9}];
  const expectText = '{"itemList":[{"barcode":"ITEM000001","name":"雪碧","count":5,"unit":"瓶","price":3,"countAfterPromote":4,"subTotal":12},{"barcode":"ITEM000003","name":"荔枝","count":2.5,"unit":"斤","price":15,"countAfterPromote":2.5,"subTotal":37.5},{"barcode":"ITEM000005","name":"方便面","count":3,"unit":"袋","price":4.5,"countAfterPromote":2,"subTotal":9}],"reduce":7.5,"amount":58.5}';  
  it('it should return the right result', () => {
    const obj = calculateSubtotalAndAmount(receiptBase);
    expect(JSON.stringify(obj)).toEqual(expectText);
  });
});

describe('function generateReceipt() test', () => {
  const obj = {"itemList":[{"barcode":"ITEM000001","name":"雪碧","count":5,"unit":"瓶","price":3,"countAfterPromote":4,"subTotal":12},{"barcode":"ITEM000003","name":"荔枝","count":2.5,"unit":"斤","price":15,"countAfterPromote":2.5,"subTotal":37.5},{"barcode":"ITEM000005","name":"方便面","count":3,"unit":"袋","price":4.5,"countAfterPromote":2,"subTotal":9}],"reduce":7.5,"amount":58.5}; 
  const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;
  it('it should return the right result', () => {
    const receiptToString = generateReceipt(obj);
    expect(receiptToString).toEqual(expectText);
  });
});