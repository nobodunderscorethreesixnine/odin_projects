class HashMap { 
    constructor(initialCapacity = 16, loadFactor= 0.75) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0
        this.buckets = Array(this.capacity).fill(null).map(()=>[]);
    }

    // resize - when the number of entries exceeds the load factor, we double the bucket size to reduce collisions and maintain performance
    resize() {
        const oldBuckets = this.buckets; /* copying old buckets */
        this.capacity *= 2; /* increasing buckets by 2 times = 16 * 2 = 32 */
        this.buckets = Array(this.capacity).fill(null).map(()=>[]); /* creating new array with new bucket size */
        this.size = 0 /* resetting the size vlaue to 0 */
        /* Re-hashing and  looping through each and every keys/values and setting in new bucket */
        for (const bucket of oldBuckets) {
            for (const [key,value] of bucket) {
                this.set(key,value)
            }
        }
    }
    /* hashing algorithm */    
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }
    /* adding key&value to hashMap */
    set(key,value) {
     let index = this.hash(key);
     let bucket = this.buckets[index]
     for (let entry of bucket) {
        if (entry[0] === key) {
            entry[1] = value; /* updating existing key */
            return; /* it will exit out of loop */
        }
     }
     bucket.push([key,value])
     this.size++;

     /* calling reszing method to check*/
     if (this.size > this.capacity * this.loadFactor) { /* checking if its time to increase the size of hashMap */
        this.resize()
     }
    }
    /* return value of specific keys */
    get(key) {
        let index = this.hash(key)
        for (let bucket of this.buckets[index]) {
            if (bucket[0] === key) {
                return bucket[1]
            }
        }
        return null;
    }
    /* check if hashMap have key present or not */
    has(key) {
        // return this.get(key) ? true : false;
        return this.get(key) !== null
    }
    /* remove specific keys */
    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i,1) /* i-> startIndex to delete, 1-> how many element to delete */
                this.size--;
                return true
            }
        }
        return false;
    }
    /* returns number of the keys in hash map */
    // length() {
    //     let counter = 0
    //     // const bucket = this.buckets[0];
    //     for (let i = 0; i < this.buckets.length; i++) {
    //         const bucket = this.buckets[i];            
    //         counter += bucket.length /* counting buckets[sub arrays] */
    //         /* note below code will also work but u don't have to check if key is present or not, we can simply check the lenght of all buckets, */
    //         // for (let key of bucket) {
    //         //     if (key[0] !== '') {
    //         //         counter++;
    //         //     }
    //         // }
    //     }
    //     return counter;
    // }
    length() {
        return this.size; /* as we have increased this.size while adding(set()) new entires, so we can directly return this.size*/
    }
    /* removes all entries in the hash Map */
    clear() {
        this.buckets = Array(this.capacity).fill(null).map(()=>[])
        this.size = 0;
    }
    /* keys - return an array containing all the keys inside hashMap */
    keys() {
        let keysArray = []
        for (const bucket of this.buckets) {
            for (const [key] of bucket) { /*[key] --> destructuring, so value will be ignore */
                keysArray.push(key)
            }
        }
        /* below code will also work */
        // for (let i = 0; i < this.buckets.length; i++) {
        //     const bucket = this.buckets[i];
        //     for (let elem of bucket) {
        //         keysArray.push(elem[0])
        //         // if (elem[0]) {
        //         //     keysArray.push(elem[0])
        //         // }
        //     }
            
        // }
        return keysArray;
    }
    /* values - return an array containing all the vlaues insdie hashMap */
    values() {
        let valuesArray = []
        for (const bucket of this.buckets) {
            for (const [,value] of bucket) { /* [,value] - destructuring, in this case ignoring(skip) keys */
                valuesArray.push(value)
            }
        }
        return valuesArray;
    }
    /* entries - return an array containing both keys and values */
    entries() {
        let hashMapArray = []
        for (const bucket of this.buckets) {
            for (let [key,value] of bucket) {
                hashMapArray.push([key,value])
            }
        }
        return hashMapArray
    }
}

const test = new HashMap() // or HashMap() if using a factory

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('lion', 'yellow')
test.set('moon', 'silver')

console.log(test.buckets)
console.log(test.loadFactor)
console.log(test.size)
console.log(test.capacity)