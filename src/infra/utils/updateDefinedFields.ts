export function updateDefineFields<T extends object>(target: T, updates: Partial<T>){
    for (const [key, value] of Object.entries(updates)){
        if (value !== undefined){
            (target as any)[key] = value
        }
    }
}