import BSTree from "./BSTree.js";

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new BSTree(array);

console.log(tree.view());

const sorted = [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345];
