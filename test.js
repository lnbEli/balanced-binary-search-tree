import BSTree from "./BSTree.js";
const array = [
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 11, 17, 14, 123, 18, 19, 14,
  13, 15, 17, 19, 167, 16345, 1324, 1, 5, 7,
];
const tree = new BSTree(array);

tree.prettyPrint();
