'use strict';

const { findKinds, findCount, findTable, getPromotion, calculateSubtotalAndAmount, generateReceipt} = require('../main/main')

// describe('pso findKinds ', () => {

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
// });

describe('function findKinds() test', () => {

  it('it should return the right result', () => {

    const buy_items = findKinds(tags);
    //console.info(buy_items);
    const buy_items_array = Array.from(buy_items)
    const expectText = '["ITEM000001","ITEM000003","ITEM000005"]';
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

// describe('function calculateSubtotalAndAmount() test', () => {

//   it('it should return the right result', () => {
//     const kinds = findKinds(tags);
//     const items = findCount(tags,kinds);
//     let itemList = findTable(items);
//     let receiptBase = getPromotion(itemList);
//     let obj = calculateSubtotalAndAmount(receiptBase);
//     const expectText = '{"itemList":[{"barcode":"ITEM000001","name":"雪碧","count":5,"unit":"瓶","price":3,"countAfterPromote":4,"subTotal":12},{"barcode":"ITEM000003","name":"荔枝","count":2.5,"unit":"斤","price":15,"countAfterPromote":2.5,"subTotal":37.5},{"barcode":"ITEM000005","name":"方便面","count":3,"unit":"袋","price":4.5,"countAfterPromote":2,"subTotal":9}],"reduce":7.5,"amount":58.5}';
//     expect(JSON.stringify(obj)).toEqual(expectText);
//   });
// });
