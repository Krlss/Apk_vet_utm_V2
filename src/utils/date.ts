export const getDateDiff = (date: string) => {
    const dateNow = new Date();
    const datePast = new Date(date ?? '');
    const diffTime = Math.abs(dateNow.getTime() - datePast.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
        return 'Hoy'
    } else if (diffDays < 2) {
        return 'Ayer'
    } else if (diffDays < 7) {
        return `Hace ${diffDays} días`
    } else if (diffDays < 30) {
        return `Hace ${Math.ceil(diffDays / 7)} semanas`
    } else if (diffDays < 365) {
        return `Hace ${Math.ceil(diffDays / 30)} meses`
    } else {
        return `Hace ${Math.ceil(diffDays / 365)} años`
    }
}

export const getDateDiffBirth = (date: string) => {
    const dateNow = new Date();
    const datePast = new Date(date ?? '');
    const diffTime = Math.abs(dateNow.getTime() - datePast.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
        return '1 día'
    } else if (diffDays < 7) {
        return `${diffDays} días`
    } else if (diffDays === 7) {
        return '1 semana'
    } else if (diffDays < 30) {
        return `${Math.ceil(diffDays / 7)} semanas`
    } else if (diffDays === 30) {
        return `1 mes`
    } else if (diffDays < 365) {
        return `${Math.ceil(diffDays / 30)} meses`
    } else if (diffDays === 365) {
        return `1 año`
    } else {
        return `${Math.ceil(diffDays / 365)} años`
    }
}