// TYPES
export type Card_TP<T> = {
    id: string
    title: string
    name?: T
    addLabel?: string
    viewLabel?: string
    addComponent?: JSX.Element
    viewHandler?: () => void
}

export type FormNames_TP = 'partners' | "add_supplier" | "add_account" | "add_employee" | "add_administrative_structure"

export type GlobalFormNames_TP = 'countries' | 'cities' | "districts" | 'colors' | 'classifications' | 'nationalities' | "karats" | "categories" | "markets"

export type StonesFormNames_TP = "stones" |
    "shapes" |
    "qualities" |
    "purities" |
    "natures" | 'colors'
// HELPERS


