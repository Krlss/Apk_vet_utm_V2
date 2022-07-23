export const formatNumber = (number: number) => {
    return number >= 1000 ? Math.round(number / 100) / 10 + 'k' : number;
}

export const getSex = (string: string) => {
    switch (string) {
        case 'M':
            return 'MACHO';
        case 'F':
            return 'HEMBRA';
        default:
            return '';
    }
}