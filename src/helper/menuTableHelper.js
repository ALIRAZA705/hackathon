import {IMG_STORAGE_BASE_URL} from "../config";

export const menuTableDataMapper = (raw) =>{
    const tableEntry =  {
        id: raw.id,
        name: raw.item_name,
        img: IMG_STORAGE_BASE_URL + raw.restaurant_file[0].restaurant_file,
        sku: raw.sku,
        price: raw.regular_price,
        stock: raw.stock,
        category: (()=>{
            let categoryList = [];
            const cat = raw.category.split(",");
            cat.forEach(c=>{
                categoryList.push({label: c, value:c})
            })
            return categoryList;
        })(),
    }
    return tableEntry;
}
