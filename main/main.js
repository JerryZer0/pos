'use strict';

function printReceipt(tags){
  let kinds = findKinds(tags);
  let itemsList = findCount(tags,kinds);
	let itemsListAddInfo = findTable(itemsList);
	let itemsListAfterPromotion = getPromotion(itemsListAddInfo);
	let finalObj = calculateSubtotalAndAmount(itemsListAfterPromotion);
	let receiptToString = generateReceipt(finalObj);
  console.log(receiptToString);
}

//查找购买商品的种类
function findKinds(tags){
  let kinds = new Set();
  for(let i=0;i<tags.length;i++){
    let temp = tags[i].substring(0,10);
    if(!kinds.has(temp))
      kinds.add(temp);
  }
  let buy_items = kinds;
  console.info(buy_items);
  return buy_items;
}

//查找购买对应商品的数量
function findCount(tags,kinds){
  let items = [];
  let count = 0;
  for(let item of kinds){
    count = 0;
    for(let j=0;j<tags.length;j++){
      if(item === tags[j].substring(0,10)){
        if(tags[j].indexOf('-')>-1)
          count += parseFloat(tags[j].substring(11));
        else
          count++;
      }
    }
    items.push({
      barcode:item,
      count:count
    })
  }
  console.log(items);
  return items;
}

//补充商品的其余信息
function findTable(items){
  console.info(items);
  let itemList = loadAllItems();
  let buy_items_list = [];
  let product = null;
  for(let i=0;i<items.length;i++){
    for(let j=0;j<itemList.length;j++){
      if(items[i].barcode === itemList[j].barcode){
        product={
          barcode:itemList[j].barcode,
          name:itemList[j].name,
          count:items[i].count,
          unit:itemList[j].unit,
          price:itemList[j].price,
        }
        break;
      }

    }
    buy_items_list.push(product);
  }
    console.info(buy_items_list);
  return buy_items_list;
}

//查找打折商品，并添加额外的数量标记
function getPromotion(itemList){
  let num=0;
  let promotionList = loadPromotions();
  for(let i=0;i<itemList.length;i++){
    num = itemList[i].count;
    for(let itemBarcode of promotionList[0].barcodes){
      if((itemBarcode === itemList[i].barcode) && itemList[i].count>2){
        num = itemList[i].count - 1;
      }
      itemList[i].countAfterPromote = num;
    }
    itemList[i].subTotal = itemList[i].countAfterPromote * itemList[i].price;
  }
  console.info(itemList);
  return itemList;
}

//计算商品的小计以及总金额、节约的钱
function calculateSubtotalAndAmount(receiptBase){
  let reduce = 0;
  let amount = 0;
  for(let i=0;i<receiptBase.length;i++){
	  if(receiptBase[i].count !== receiptBase[i].countAfterPromote){
       reduce += receiptBase[i].price;
      }
	  amount += receiptBase[i].subTotal;
  }
  let obj ={
	  itemList:receiptBase,
	  reduce:reduce,
	  amount:amount
  }
  return obj;
}

//生成小票并调整金额的格式
function generateReceipt(obj){
	let itemList = obj.itemList;
	let str;
	str = "";
	for(let i=0;i<itemList.length;i++){
      str += `\n名称：${itemList[i].name}，数量：${itemList[i].count}${itemList[i].unit}，单价：${itemList[i].price.toFixed(2)}(元)，小计：${itemList[i].subTotal.toFixed(2)}(元)`
	}
  let receiptToString = `***<没钱赚商店>收据***${str}
----------------------
总计：${obj.amount.toFixed(2)}(元)
节省：${obj.reduce.toFixed(2)}(元)
**********************`
	return receiptToString;
}































