export const array = {
   //category 0-
   // categories : cat_arr,
   categories: [
      { name: 'Распродажа', url: '/' },
      { name: 'Двери', },
      { name: 'Фурнитура', },
      { name: 'Плинтус', url: '/plintus' },
   ],
   //Doors subCat+1
   // ' двери'
   doorsCat: [
      { name: 'Входные', db:'vchod' },
      { name: 'Массив', db:'massiv'},
      { name: 'Эко Шпон', db:'ecoshpon'},
      { name: 'МДФ', db:'mdf'},
   ],
   // subSusbCat+1 url: '/-------' 
   vhod_door: [
      { name: 'Econom', db:'econom', url: '/catalog/category/vchod/sub_category/econom' },
      { name: 'Porta R-2',db:'porta-r2', url: '/catalog/category/vchod/sub_category/porta-r2' },
   ],
   massDoors: [
      { name: 'Classico', db:'classico', url: '/catalog/category/massiv/sub_category/classico' },
      { name: 'Поставы', db:'postavy', url: '/catalog/category/massiv/sub_category/postavy' },
      { name: 'Ока', db:'oka', url: '/catalog/category/massiv/sub_category/oka' },
   ],
   ecoDoors: [
      { name: 'Porta X', db:'porta-x',  url: '/catalog/category/ecoshpon/sub_category/porta-x' },
      { name: 'Legno',  db:'legno',url: '/catalog/category/ecoshpon/sub_category/legno' },
      { name: 'Vetro', db:'vetro', url: '/catalog/category/ecoshpon/sub_category/vetro' },
   ],
   mdfDoors: [
      { name: 'МДФ Юркас',  db:'mdf-yurkas',url: '/catalog/category/mdf/sub_category/mdf-yurkas' },
   ],
   //Входные двери подкатегории нет!



   //Furnitua
   furnCat: [
      { name: 'Круг' },
      { name: 'Квадрат' },
   ],
   krugFurn: [
      { name: 'Круг1', url: '/pens' },
      { name: 'Круг22' },
   ],
   kvadrFur: [
      { name: 'Квадрат11' },
      { name: 'Квадрат22' },
   ],

}