import { categoryMap } from './categoryMap';
import { Category } from '../models';

export const findCategory = (itemName: string): Category | undefined => {
    const lowerItem = itemName.toLowerCase().trim();

    // 1. Direct match
    if (categoryMap[lowerItem]) {
        return categoryMap[lowerItem];
    }

    // 2. Try to find by removing plural 's'
    if (lowerItem.endsWith('s')) {
        const singular = lowerItem.slice(0, -1);
        if (categoryMap[singular]) {
            return categoryMap[singular];
        }
    }
    
    // 3. Try to find by removing plural 'es'
    if (lowerItem.endsWith('es')) {
        const singular = lowerItem.slice(0, -2);
        if (categoryMap[singular]) {
            return categoryMap[singular];
        }
    }

    // 4. Try to find by changing 'ies' to 'y'
    if (lowerItem.endsWith('ies')) {
        const singular = lowerItem.slice(0, -3) + 'y';
        if (categoryMap[singular]) {
            return categoryMap[singular];
        }
    }

    // 5. Try adding 's'
    const pluralS = lowerItem + 's';
    if (categoryMap[pluralS]) {
        return categoryMap[pluralS];
    }

    // 6. Try adding 'es'
    const pluralEs = lowerItem + 'es';
    if (categoryMap[pluralEs]) {
        return categoryMap[pluralEs];
    }
    
    return undefined;
};
