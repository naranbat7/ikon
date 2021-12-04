module.exports = {
  maxNumber4Array: (arr1, arr2, arr3, arr4) => {
    let l1 = arr1.length;
    let l2 = arr2.length;
    let l3 = arr3.length;
    let l4 = arr4.length;
    let max = 0;
    for (let i = 0; i < l1; i++) if (max < arr1[i]) max = arr1[i];
    for (let i = 0; i < l2; i++) if (max < arr2[i]) max = arr2[i];
    for (let i = 0; i < l3; i++) if (max < arr3[i]) max = arr3[i];
    for (let i = 0; i < l4; i++) if (max < arr4[i]) max = arr4[i];

    return max;
  },
  numberWithCommas: (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
};
