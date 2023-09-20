import {IMG_STORAGE_BASE_URL} from "../config";

export const menuTableDataMapper = (raw) =>{
    const tableEntry =  {
        id: raw.id,
        name: raw.item_name,
        description: raw.description,
        sale_price: raw.sale_price,
        restaurant_menue_variant: raw.restaurant_menue_variant,
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
        category_type: raw.category_type
    }
    return tableEntry;
}
