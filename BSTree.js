import mergeSort from "../merge-sort/merge-sort.js";
import BSTNode from "./BSTNode.js";
export default class BSTree {
  constructor(arr) {
    this.root = this.buildTree(arr, true);
  }

  buildTree(array, initialCall = false) {
    let noDuplicatesArray;
    let sortedArray;
    if (initialCall) {
      noDuplicatesArray = [...new Set(array)];
      sortedArray = mergeSort(noDuplicatesArray);
    } else {
      sortedArray = array;
    }

    const middleArrayNumberIndex = Math.floor(sortedArray.length / 2);

    const node = new BSTNode(sortedArray[middleArrayNumberIndex]);

    return node;
  }

  view() {
    return this.root;
  }
  //
  //
  //
  //

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
