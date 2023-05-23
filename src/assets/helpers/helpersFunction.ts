export const getSalary = (from:number, to: number, currency:string ) => {
if(from === 0 && to === 0 ){
    return null
}
if(from !== 0 && to === 0){
    return `з/п от ${from} ${currency}`
}
if(from !== 0 && to !== 0){
    return `з/п от ${from} до ${to} ${currency}`
}
if(from === 0 && to !== 0){
    return `з/п ${to} ${currency}`
}
}