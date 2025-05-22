function analyzeArray(arr) {
    if (!arr || arr.length === 0) return null;
	return {
         average: arr.reduce((sum,num)=>sum+num,0) / arr.length,
         min: Math.min(...arr),
         max: Math.max(...arr),
         length:arr.length
    };
}

export {analyzeArray}