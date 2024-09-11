import BSTree from "./BSTree.js";

function arrOf100Numbers() {
  const arr = [];
  for (let i = 0; i < 100; i++) {
    const randomNumber = Math.trunc(Math.random() * 100);
    arr.push(randomNumber);
  }
  return arr;
}

function printElementCallback(node) {
  console.log(node.data);
}

arrOf100Numbers();

const tree = new BSTree(arrOf100Numbers());
tree.insert(103);
tree.insert(112);
tree.insert(193);
tree.prettyPrint();
console.log(tree.isBalanced());

tree.inOrder(printElementCallback);
tree.preOrder(printElementCallback);
tree.postOrder(printElementCallback);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
tree.inOrder(printElementCallback);
tree.preOrder(printElementCallback);
tree.postOrder(printElementCallback);
