import BSTree from "./BSTree.js";
import util from "util";
const array = [
  1, 7, 4, 23, 8, 4, 3, 5, 7, 9, 67, 6345, 324, 11, 17, 14, 123, 18, 19, 14, 13,
  15, 17, 19, 167, 16345, 1324, 1, 5, 7,
];

// const array = [];
const tree = new BSTree(array);

tree.insert(3.4);
tree.insert(16346);
tree.insert(324.5);

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

function counter(node) {}

// tree.levelOrderRecursive(printData);
tree.levelOrder(printData);

// console.log(tree.find(3.4));
// tree.inOrder(printData);
// console.log(tree.root.leftChild.leftChild.rightChild);
const node324 = tree.root.rightChild.rightChild.leftChild.leftChild;
const root = tree.root;
const node6345 = tree.root.rightChild.rightChild;
const node1324 = tree.root.rightChild.rightChild.leftChild;
const nodeLast = tree.root.rightChild.rightChild.leftChild.leftChild.rightChild;
const node167 = tree.root.rightChild;
const node23 = tree.root.rightChild.leftChild;
// console.log("counter", tree.depth(node324));
// console.log("counter", tree.height(node324));
// console.log("counter", tree.height(root));

// console.log(tree.root.leftChild.leftChild.rightChild.data);
console.log(
  "height",
  util.inspect(tree.height(root), { depth: null, colors: true })
);
