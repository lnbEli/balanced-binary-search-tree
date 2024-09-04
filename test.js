import BSTree from "./BSTree.js";
const array = [
  1, 7, 4, 23, 8, 4, 3, 5, 7, 9, 67, 6345, 324, 11, 17, 14, 123, 18, 19, 14, 13,
  15, 17, 19, 167, 16345, 1324, 1, 5, 7,
];

// const array = [];
const tree = new BSTree(array);

tree.insert(3.4);
// tree.insert(22);

// tree.deleteItem(124);
// tree.deleteItem(1);

// tree.deleteItem(11);
// tree.deleteItem(18);
// tree.deleteItem(67);
// tree.deleteItem(13);
// tree.deleteItem(15);
// tree.deleteItem(5);
// tree.deleteItem(7);
// tree.deleteItem(3);
// tree.deleteItem(8);
// tree.deleteItem(4);
// tree.deleteItem(14);
// tree.deleteItem(9);
// tree.deleteItem(17);
tree.prettyPrint();

function printData(node) {
  console.log(node.data);
}

// tree.levelOrderRecursive(printData);
// tree.levelOrder(printData);

tree.inOrder(printData);
console.log(tree.height());
