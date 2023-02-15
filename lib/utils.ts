
export function convertToSlug(text: string) {
    return text.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

export function titleCase(text: string) {
    const splitStr = text.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' } as const
export const dateFormatter = Intl.DateTimeFormat("en-GB", dateOptions)

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}