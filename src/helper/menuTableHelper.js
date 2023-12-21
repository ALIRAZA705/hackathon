import {IMG_STORAGE_BASE_URL} from "../config";

export const menuTableDataMapper = (raw) =>{
    const tableEntry =  {
        id: raw.id,
        name: raw.item_name,
        description: raw.description,
        sale_price: raw.sale_price,
        restaurant_menue_variant: raw.restaurant_menue_variant,
        img: IMG_STORAGE_BASE_URL + raw.restaurant_file[0]? raw.restaurant_file[0]?.restaurant_file : 
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAxCAYAAACVtYpYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAARhSURBVGhD1Zo9TFRBEMd3945GhE4KtRArDVgKtKKWFNoYC0OhlR/Uxliq2JmolYmJSqONxmAp1B6WYrQSGwq1Q4kN9547e/Pu3sfs7sy9w+ivgLmDt7f/N7Mzs/tOpxaVI119pdLvm0oNjyo9OaX0+BH8C5Mfmyr9sNYZwwLX6+lTzu6LX1sqefMMX+B440eVGjuA7xTpCkrX11T7+QP3u4C9cOjWkneAPDs3L1SvB2CMR6v4gk+y/NTO6aFS21v4Tg8zN68a564qtXcU3+ngBIGQBC70wRAFQkCQj+a91yJvt+9fV4mNlhAwHoybx6TfNsNiABs+O/YDQsAEQuwsXkYrjrvBETFAuvEZrR4meRERg5ChhHTXXQj797S1gi/8sG5wjvK8TLrxCc3+4Y7RXn6Clh/uDc7YHUHbP9EKw/mspPUWLR7JegutDgbSMxubQmthhQdD94sVTGS0IKVQN5qRjjPSj+/RKuLqApOgl37zPJ2nvHaNscWTS1pyb4Y+zE/H0pCSYvQMv4r7JqMn7E1hhu4g1myB4RE0Ohh9iH93nXtta0PBLpqhdbSPH/4ZeuwgWh1cUoCejUvyjvaSmT6NVpyBeqmUA4z7MTntXnBIPHdXTxxHK443dGFykqxrKecAJ0gfG0RiGEym00JBihQkWNSxWsIiMIakgQVMqWQ4QYBkoNqCLD4vSeoiRVeQZFGX241+8NajUtaS0vPQ9Em04jgPEW1QOYWG2HUPSTNM+rW6F5Gkf+86kqwhQnxXEGAEe/+UCBmXXARQXpJ4iGrbCoIkE6LWgJnhhy3gr0e80DUnzqLVo+ghwYRcG1ReR9B1SNcRtRaZYUfVz4IgaZVO16pbaiNILm4dEWuRMw9fd1MUJIRK31rQRgFUYuDsr/TsGbSK1BNEJYZJfk8HkDVtT3FLQGE87VotQWTq7WcdlYiuIciEnq1GRZColljIkBHWowql09AyoV12RZBkKwEkqy/RGhyxWkSl64yqhwRbCQDSd8VLNU9uYoTmWBUk2Uog7pgYJwUdhLfx9OCuz+qR/d1+fKdjE8SeZFQepwDtxSviSblkMDwSPxL2YcMMQs2dVwc83Fi4q4wnZQNklpPWEoedRN9igCx0I+HqS9cZtCBJtf+LuIIbORmiBTn319to7QacQ1FSECDqySI0bdwPAj0V3954BUlOVENAmAwkhCFqGCXFL6iP9E3hwmRQ4zDwCgIagfTIhRMmHELdQZ6goNphZ+uStPMgYYYbEBZkw07arObJn1HUGkdwbVAQ0Dh/DS05em4erXrjSK6NCnJe6uObIOCd/DFtLW8LHrNEBQHNhcVoS1+mcekGWj2gDxNnPOHnsgTBJBrwTRImjYtWDHFX4aY0by/xb479vyH7/xJ4giwwCTMbSZ0wYSscvofjA54Yws2JjQUbTSdG+FSP3D6EcB217Yrdg6+su4atw9h+ZcAzAtzmsLXSO4XFcWDN9rvexIL+ddgh93+g1B/pbqelV07pzwAAAABJRU5ErkJggg==",
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
