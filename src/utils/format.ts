export const formatNumber = (number: number) => {
    return number >= 1000 ? Math.round(number / 100) / 10 + 'k' : number;
}