// MergeSort algorithm
const a = [1, 2, 3, 4, 5, 6, 7, -1, 0];

function mergeSort(array) {
	// base case
	if (array.length <= 1) return array;
	const midValue = Math.floor(array.length / 2);
	// seperating left and right array
	const leftArray = array.slice(0, midValue);
	const rightArray = array.slice(midValue); /* after midvalue select all */

	// both soreted Array will be sorted until they are singleton-> which means if there is 1 number in array then it is technically sorted
	const sortedLeftArray = mergeSort(leftArray);
	const sortedRightArray = mergeSort(rightArray);

	// now all arrays are sorted it's time to merge them
	return mergeArray(sortedLeftArray, sortedRightArray);
}

function mergeArray(left, right) {
	/* this array will store new sorted array both from left and right (merged+sorted array) */
	const mergedArray = [];
	/* now we have to initialize pointers to compare between 2 arrays */
	let i = 0,
		j = 0;
	while (i < left.length && j < right.length) {
		if (left[i] < right[j]) {
			// mergedArray.push(left[i++]) /* u can also increment directly while indexing */
			mergedArray.push(left[i]);
			i++;
		} else {
			mergedArray.push(right[j++]);
		}
	}
	/* now we have to tackle the remaining number in array, why? cause if left side array is always greater then right side array, then pointer will not increase for left side but increase for right side, and right side array may trigger false on while loop and program exit so inorder to merge all array we have to check them in different while loop for both side */
	/* note - don't initialize i or j , cause we have to continue from where the while loop have stoped */
	while (i < left.length) {
		mergedArray.push(left[i++]);
	}

	while (j < right.length) {
		mergedArray.push(right[j++]);
	}
	/* at last we have to return merged array */
	return mergedArray;
}
console.log(mergeSort(a));