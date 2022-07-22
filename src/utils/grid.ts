export const nColumns = (width: number) => {
    console.log(width)
    if (width < 200) return 1
    if (width < 425) return 2
    if (width < 600) return 3
    if (width < 800) return 4
    if (width < 1000) return 5
    if (width < 1200) return 6
    if (width < 1400) return 7
    if (width < 1600) return 8
    return 2
}