
export function normalizeName(firstName: any, middleName: any, lastName: any): string {
    const fullName = normalize(firstName)+ ' '+ normalize(middleName) + ' ' + normalize(lastName)
    return fullName.trim()
}

export function normalize(name: string): string {
    if (!name) {
        return '';
    }
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

export function replaceUnderscores(str: string) {
    return str.replace(/_/g, ' ');
  };
  