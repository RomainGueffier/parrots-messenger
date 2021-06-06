/**
 * UseState which automatically is persisted
 * Use this instead of useState if you want to persist data
 */
import { useEffect, useState } from 'react'

const DATABASE = 'parrots_client_'

export default function useLocalStorage(key, initialValue) {

    const prefixedKey = DATABASE + key

    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)
        if (jsonValue != null) {
            return JSON.parse(jsonValue)
        }
        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}
