/**
 * Tool function on arrays
 * Compare two arrays to see if their content is same
 * @returns 
 */
export function isSame(a, b) {
    if (a.length !== b.length) {
        return false
    }

    a.sort()
    b.sort()

    return a.every((element, index) => {
        return element === b[index]
    })
}
