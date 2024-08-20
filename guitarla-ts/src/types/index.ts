export type Guitar = {
    id: number
    name : string
    image: string
    description : string
    price : number
}


export type CartItem = Guitar & {
    quantity: number
}

//Metodo qu funciona solo con type para pasar ciertos atributos pick para seleccionar o omit para omitir
// export type CartItem = Pick<Guitar, 'id'| 'name'| 'price'> & {
//     quantity: number
// }

//usando lookup
// export type GuitarID = Guitar['id']