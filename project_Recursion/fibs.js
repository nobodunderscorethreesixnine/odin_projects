// iterative way to solve fibonacci problem
function fibs(num) {
    if (num === 1 || num === 0) return num;
    const array = [0,1]
    for (let i = 2; i<=num; i++) {
        let pValue = array[i-1]
        let ppValue = array[i-2]
        array.push(pValue + ppValue)
    }
    return array
}

console.log(fibs(8))

// Recursive way to solve fibonacci problem
function fibsRec(num) {
    // base case
    if (num ===1 || num === 0) return num;

    return fibsRec(num-1) + fibsRec(num - 2)
}

console.log(fibsRec(8))