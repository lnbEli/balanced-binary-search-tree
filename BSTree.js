import mergeSort from "../merge-sort/merge-sort.js";
import BSTNode from "./BSTNode.js";
export default class BSTree {
  constructor(arr) {
    this.root = this.buildTree(arr, true);
  }

  // Method to build a balanced BST
  buildTree(array, initialCall = false) {
    // Base case
    if (array.length <= 0) {
      return null;
    }
    //Checks if this is the first call of this method.
    let sortedArray;
    if (initialCall) {
      //If first call, sorts and removes and duplicates
      const noDuplicatesArray = [...new Set(array)];
      sortedArray = mergeSort(noDuplicatesArray);
    } else {
      sortedArray = array;
    }
    // Find the middle element of the array
    const middleArrayNumberIndex = Math.floor(sortedArray.length / 2);
    const data = sortedArray[middleArrayNumberIndex];

    // Split the array into left and right subarrays
    const leftArray = sortedArray.slice(0, middleArrayNumberIndex);
    const rightArray = sortedArray.slice(middleArrayNumberIndex + 1);

    // Recursively build the left and right subtrees
    return new BSTNode(
      data,
      this.buildTree(leftArray),
      this.buildTree(rightArray)
    );
  }

  // Borrowed from The Odin Project
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      this.prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
      this.prettyPrint(
        node.leftChild,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }
}
