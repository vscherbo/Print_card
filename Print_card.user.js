// ==UserScript==
// @name        Print_card
// @namespace   Print_card
// @description Печатает ценник товара по описанию на сайте kipspb
// @include     *kipspb.arc.world/catalog/*
// @include     *kipspb-dev.arc.world/catalog/*
// @include     *kipspb.ru/catalog/*
// @version     1
// @grant       none
// ==/UserScript==

var scriptHeader = document.createElement('script');
scriptHeader.type = 'text/javascript';
scriptHeader.innerHTML =  'function setHeader(aTab, aHeader) {\
/* debug newWin.document.write(aHeader.outerHTML); */ \
var theader=aTab.createTHead(); \
var d = new Date(); \
var year = d.getFullYear(); \
var month = (1 + d.getMonth()).toString(); \
month = month.length > 1 ? month : "0" + month; \
var mmyy=month+"."+year.toString().substring(2); \
/* text of header*/\
var hrow=theader.insertRow(0); \
var hcell=hrow.insertCell(0); \
var imgMMYY=newWin.document.createElement("img"); \
imgMMYY.innerHTML=mmyy; \
imgMMYY.style.cssFloat= "right"; \
imgMMYY.style.fontWeight="bold"; \
imgMMYY.style.fontSize= "7"; \
imgMMYY.style.margin="0px"; \
hcell.appendChild(imgMMYY);\
var divHeader=newWin.document.createElement("div"); \
divHeader.innerHTML=aHeader.textContent; \
divHeader.style.fontWeight="bold"; \
divHeader.style.fontSize="16"; \
hcell.appendChild(divHeader);\
hcell.colSpan=2; \
hcell.cssFloat="right"; \
hcell.style.fontStyle="italic"; \
hcell.style.padding = "2px 0px 0px 5px"; \
hcell.style.borderBottom = "thick solid #4C2E00"; \
return;\
}' ;
document.getElementsByTagName("head")[0].appendChild(scriptHeader);

var scriptDescr = document.createElement('script');
scriptDescr.type = 'text/javascript';
var scriptDescr_innerHTML =  'function setDescr(aTr, aDescr) {\
/* debug */ newWin.document.write(aDescr.firstChild.textContent); /**/ \
var cell_descr=aTr.insertCell(0); \
cell_descr.innerHTML=aDescr.firstChild.textContent;\
cell_descr.style.fontSize="12"; \
cell_descr.colSpan=2; \
return;\
}' ;
scriptDescr.innerHTML =  'function setDescr(aCellDescr, aDescr) {\
/* debug */ newWin.document.write(aDescr.firstChild.textContent); /**/ \
aCellDescr.innerHTML=aDescr.firstChild.textContent;\
aCellDescr.style.fontSize="12"; \
aCellDescr.colSpan=2; \
return;\
}' ;

document.getElementsByTagName("head")[0].appendChild(scriptDescr);

var scriptList = document.createElement('script');
scriptList.type = 'text/javascript';
scriptList.innerHTML =  'function setList(aCellList, aList) {\
var li_tags=aList.getElementsByTagName("li"); \
var list_priceCard=document.createElement("ul"); \
for (var l=0; l<Math.min(5, li_tags.length); l++) { \
  /* debug newWin.document.write("li_tags["+l + "]="+li_tags[l].outerHTML+"\\n"); */ \
  /* debug newWin.document.write("li_tags["+l + "].children.length="+li_tags[l].children.length+"\\n"); */ \
  var li_priceCard=document.createElement("LI"); \
  var textItem = document.createTextNode(li_tags[l].textContent); \
  li_priceCard.appendChild(textItem); \
  list_priceCard.appendChild(li_priceCard); \
} \
list_priceCard.style.padding = "5px 0px 0px 10px"; \
aCellList.innerHTML = list_priceCard.outerHTML; \
aCellList.style.padding = "5px 0px 0px 10px"; \
aCellList.rowSpan=2; \
aCellList.style.fontSize="10"; \
aCellList.style.verticalAlign="top"; \
aCellList.style.width="70%"; \
var loc_tags; /* TO REMOVE */\
for (var i=0; i<aList.children.length; i++) { \
  /* debug newWin.document.write("loc_tags loop i="+i +"<br>"); */ \
  /* read gocreester.gif */ var imgs=aList.children[i].getElementsByTagName("img"); /**/\
                            loc_tags+=imgs; /**/\
}\
if (loc_tags === undefined) return; else return loc_tags; \
}';
document.getElementsByTagName("head")[0].appendChild(scriptList);

var scriptPicture = document.createElement('script');
scriptPicture.type = 'text/javascript';
scriptPicture.innerHTML =  'function setPicture(aCellPic, aPicture) {\
aCellPic.innerHTML="<br>"; \
var imgs = aPicture.getElementsByTagName("img"); \
loc_pict=imgs[0]; \
/* loc_pict=aPicture.firstChild.firstChild; */\
w1=Math.max(100 /* 85 */, loc_pict.clientWidth) ; \
aCellPic.style.width=Math.min(150, w1) ; \
h1=Math.max(100, loc_pict.clientHeight) ; \
aCellPic.style.height=Math.min(115, h1) ; \
aCellPic.style.padding = "0px 0px 0px 0px"; \
aCellPic.style.margin = "0px 0px"; \
aCellPic.style.verticalAlign="top"; \
aCellPic.style.horizontalAlign="left"; \
/* IMPORTANT */ aCellPic.style.cssFloat="left"; \
aCellPic.style.background="url(\'"+ loc_pict.src + "\') center no-repeat"; \
aCellPic.style.backgroundSize="contain"; \
return aCellPic.style.width; \
}';
document.getElementsByTagName("head")[0].appendChild(scriptPicture);

var scriptPrice = document.createElement('script');
scriptPrice.type = 'text/javascript';
scriptPrice.innerHTML =  'function setPrice(aCellPrice, aPrice, aPriceWidth) {\
var price_text=aPrice.textContent; \
var pos_dots=price_text.indexOf("…"); \
if (pos_dots > 0) { \
   var price_arr=price_text.split("…"); \
   price_text="от "+price_arr[0] + " р.";\
} \
/* debug newWin.document.write("price_text="+price_text); */ \
var imgPrice=newWin.document.createElement("img"); \
imgPrice.innerHTML=price_text; \
imgPrice.style.cssFloat= "right"; \
imgPrice.style.fontWeight="bold"; \
imgPrice.style.fontSize= "18"; \
imgPrice.style.fontStyle= "italic"; \
imgPrice.style.margin="0px"; \
aCellPrice.appendChild(imgPrice);\
/* \
aCellPrice.innerHTML=price_text; \
aCellPrice.align="center"; \
aCellPrice.style.fontSize="18"; \
aCellPrice.style.fontWeight="bold"; \
aCellPrice.style.fontStyle="italic"; \
aCellPrice.style.width=aPriceWidth ; \
aCellPrice.style.height="20px" ; \
aCellPrice.style.padding = "10px 0px 0px 0px"; \
*/ \
}';
document.getElementsByTagName("head")[0].appendChild(scriptPrice);

var scriptPrintItem = document.createElement('script');
scriptPrintItem.type = 'text/javascript';
scriptPrintItem.innerHTML =  'function printItem(aWin, aCatalogItem, aHeaderToPrint) {\
/****************** Header */ \
var newTab=aWin.document.createElement("table") ;\
setHeader(newTab, aHeaderToPrint); \
/****************** Description */ \
var shortToPrint=aCatalogItem.getElementsByClassName("catalog-item-text"); \
/* debug newWin.document.write("shortToPrint.length="+shortToPrint.length +"<br>"); */ \
if (shortToPrint.length > 0 ) { \
  var tr1 = aWin.document.createElement("tr"); \
  var cell_descr=tr1.insertCell(0); \
  /* setDescr(cell_descr, shortToPrint[0]); */ \
  /****************** List */ \
  var tr2 = aWin.document.createElement("tr"); \
  var cell_list=tr2.insertCell(0); \
  var tags = setList(cell_list, shortToPrint[0]); \
  /****************** Picture */\
  var pictureToPrint=aCatalogItem.getElementsByClassName("catalog-item-picture"); \
/** console.log("pictureToPrint[0].innerHTML="+pictureToPrint[0].innerHTML); \
console.log("pictureToPrint[0].firstElementChild.currentSrc="+pictureToPrint[0].firstElementChild.currentSrc); **/ \
  var cell_pic=tr2.insertCell(1); \
  setPicture(cell_pic,pictureToPrint[0]); \
} \
/****************** Price */\
var PriceToPrint=aCatalogItem.getElementsByClassName("catalog-item-price catalog-item-cloud"); \
var tr3 = aWin.document.createElement("tr"); \
var cell_price=tr3.insertCell(-1);\
setPrice(cell_price, PriceToPrint[0], "280px"); \
/****************** Add table rows */\
/* newTab.appendChild(tr1); */\
newTab.appendChild(tr2);\
newTab.appendChild(tr3);\
/* IMPORTANT */ newWin.document.write("<span></span>");\
newTab.style.pageBreakInside = "avoid"; \
return newTab; \
/* aWin.document.body.appendChild(newTab); */ \
}';
document.getElementsByTagName("head")[0].appendChild(scriptPrintItem);

/*********** CSS */
var scriptPrintCSS = document.createElement('script');
scriptPrintCSS.type = 'text/javascript';
scriptPrintCSS.innerHTML =  'function printCSS(aDoc, aWin) { \
var bgColor="#FFF";\
var css = "body {width: 630px; } table {width: 285px; float: left; background:" + bgColor + "; border-width: 1px; border-right-style: dotted; border-bottom-style: dotted;} td {height: 20px; border: 1px dashed " + bgColor + ";}" ;\
var cssRight = " table.right {width: 285px; float: right; border-width: 1px; border-left-style: dotted; border-bottom-style: dotted;}"; \
var head = aDoc.head || aDoc.getElementsByTagName("head")[0]; \
var style=aWin.document.createElement("style"); \
style.type = "text/css"; \
if (style.styleSheet){ \
  style.styleSheet.cssText = css; \
} else { \
  style.appendChild(aDoc.createTextNode(css)); \
} \
style.appendChild(aDoc.createTextNode(cssRight)); \
aWin.document.head.appendChild(style); \
}';
document.getElementsByTagName("head")[0].appendChild(scriptPrintCSS);


/*********** Element */
var scriptPrintSingle = document.createElement('script');
scriptPrintSingle.type = 'text/javascript';
scriptPrintSingle.innerHTML =  'function printCard() { \
newWin= window.open(""); \
var itemDiv=document.getElementsByClassName("catalog-item")[0].firstElementChild; \
var headerToPrint=document.getElementById("pageheader"); \
var printTab = printItem(newWin, itemDiv, headerToPrint); \
newWin.document.body.appendChild(printTab); \
printCSS(document, newWin); \
newWin.document.close(); \
}';
document.getElementsByTagName("head")[0].appendChild(scriptPrintSingle);

/*********** List */
var scriptPrintList = document.createElement('script');
scriptPrintList.type = 'text/javascript';
scriptPrintList.innerHTML =  'function printList() { \
newWin= window.open(""); \
var catIterator=document.getElementById("catalog_items_content"); \
var cnt=0; \
var chkBoxIgnore=true;\
for (var j=0; j<catIterator.children.length; j++) { \
  var catItem=catIterator.children[j]; \
  if ( catItem.clientHeight === 0) { continue; } \
  var Price=catItem.getElementsByClassName("catalog-item-price catalog-item-cloud"); \
  if ( Price.length > 0)  { \
     var chkBoxes=catItem.getElementsByClassName("classChkBox");\
     /* Если есть помеченный чек-бокс, их игнорировать нельзя */ \
     if (chkBoxes[0].checked) { chkBoxIgnore=false; break; }\
  }\
}\
for (var j=0; j<catIterator.children.length; j++) { \
  var catItem=catIterator.children[j]; \
  if ( catItem.clientHeight === 0) { continue; } \
  var Price=catItem.getElementsByClassName("catalog-item-price catalog-item-cloud"); \
  /* debug newWin.document.write("Price.length=",Price.length); */\
  if ( Price.length > 0) { \
    var chkBoxes=catItem.getElementsByClassName("classChkBox");\
    /* Если нет ни одного отмеченного чек-бокса, то не проверяем их состояние */ \
    if (chkBoxIgnore || chkBoxes[0].checked) {\
       var headers=catItem.getElementsByClassName("catalog_item_name_content"); \
       var headerToPrint=headers[0]; \
       var printTab = printItem(newWin, catItem, headerToPrint); \
       newWin.document.body.appendChild(printTab); \
       if (cnt % 2 === 1) printTab.className="right"; \
       cnt++; \
    }\
  }\
  newWin.document.write("<br> <br>"); \
}\
printCSS(document, newWin); \
newWin.document.close(); \
}';
document.getElementsByTagName("head")[0].appendChild(scriptPrintList);

window.addButton = function () {
   var contentDiv=document.getElementById("wrap_content");
   var curURL=document.URL;
   var strTitle='';
   var functionName='';
   if (curURL.indexOf('/element') > 0) {
      var targets = contentDiv.getElementsByClassName('catalog-item-extra');
      var targetDiv = targets[0];
      strTitle='Ценник';
      functionName="printCard();";
   } else {
     var targetDiv = document.getElementById('catalog_filter');
     strTitle='Ценники';
     functionName="printList();";
   };
    
   
    // Create a div to surround the button
    var newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'idPrintCard');

    // Create the button `strTitle` and set its attributes
    var inputButton = document.createElement('input');
    inputButton.name = 'printCardButton';
    inputButton.type = 'button';
    inputButton.value = strTitle;
    inputButton.style.background = '#FFB547';
    inputButton.setAttribute("onclick", functionName); //"printCard();");
  
    // Append the button to the div
    newDiv.appendChild(inputButton); 
    targetDiv.appendChild(newDiv);
}

window.addChkBoxes = function() {
   var contentDiv=document.getElementById("content");
   var curURL=document.URL;
   //if (curURL.indexOf('/element') = 0) { // list, not element
      var catParent=document.getElementById("catalog_items");
      var catIterator=document.getElementById("catalog_items_content");
      // OLD var catIterator=document.getElementsByClassName("catalog-item-text")[0];
      for (var j=0; j<catIterator.children.length; j++) {
          var catItem=catIterator.children[j];
          var Price=catItem.getElementsByClassName("catalog-item-price catalog-item-cloud");
          // var Extra=catItem.getElementsByClassName("catalog-item-picture-wrap");
          var existedChkBoxes=catItem.getElementsByClassName("classChkBox");
          if ( existedChkBoxes.length > 0 ) { continue; }
          if ( Price.length > 0) {
             var cbDiv = document.createElement('div');
             cbDiv.setAttribute('id', 'idCheckBox');
             var chkBox = document.createElement('input');
             chkBox.type = 'checkbox';
             chkBox.id = 'chkbox';
             chkBox.className = 'classChkBox';
             var label = document.createElement('label')
             label.htmlFor = 'chkbox';
             label.appendChild(document.createTextNode('Печатать'));
             label.style.fontSize="14px";
             label.style.verticalAlign="2px";
             //catItem.appendChild(chkBox);
             //catItem.appendChild(label);
             cbDiv.appendChild(chkBox);
             cbDiv.appendChild(label);
             catItem.appendChild(cbDiv);
          }
      }
   //}
}

addButton();
addChkBoxes();

