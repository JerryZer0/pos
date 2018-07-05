'use strict';

function printReceipt(tags){
  let kinds = findKinds(tags);
  let items = findCount(tags,kinds);
	let itemList = findTable(items);
	let receiptBase = getPromotion(itemList);
	let obj = calculate(receiptBase);
	let str = generateReceipt(obj);
  console.log(str);
}

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
function calculate(receiptBase){
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
/*
***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************
*/
function generateReceipt(obj){
	let itemList = obj.itemList;
	let str;
	str = "";
	for(let i=0;i<itemList.length;i++){
//		str += "名称："+ itemList[i].name + "，数量："
//		+ itemList[i].count + itemList[i].unit +"，单价："
//		+ itemList[i].price.toFixed(2)+"(元)，小计："
//		+ itemList[i].subTotal.toFixed(2)+"(元)\n";
      str += `\n名称：${itemList[i].name}，数量：${itemList[i].count}${itemList[i].unit}，单价：${itemList[i].price.toFixed(2)}(元)，小计：${itemList[i].subTotal.toFixed(2)}(元)`
	}
  let receiptToString = `***<没钱赚商店>收据***${str}
----------------------
总计：${obj.amount.toFixed(2)}(元)
节省：${obj.reduce.toFixed(2)}(元)
**********************`
//	str += "----------------------\n";
//	str += "总计："+ obj.amount.toFixed(2) + "(元)\n";
//	str += "节省："+ obj.reduce.toFixed(2) + "(元)\n";
//	str += "**********************";
	return receiptToString;
}































