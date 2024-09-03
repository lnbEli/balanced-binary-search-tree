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

  insert(value, node = this.root) {
    //Checks value entered is number
    if (typeof value !== "number") {
      console.log("Enter a number!");
      return;
    }
    //Value already exists and we don't want duplicates
    if (value === node.data) {
      console.log("Value already exists!");
      return;
    }
    //Checks if tree is empty
    if (this.root === null) {
      this.root = new BSTNode(value);
      return;
    }
    //Base case
    if (value < node.data && node.leftChild === null) {
      node.leftChild = new BSTNode(value);
      return;
    }
    //Base case
    if (value > node.data && node.rightChild === null) {
      node.rightChild = new BSTNode(value);
      return;
    }
    //Recursive call
    if (value < node.data) {
      //Traverse left subtree
      return this.insert(value, node.leftChild);
    } else {
      //Traverse right subtree
      return this.insert(value, node.rightChild);
    }
  }

  deleteItem(value, node = this.root, parentNode = null) {
    //If value not found or root doesn't exist.
    if (node === null) {
      return;
    }

    //Helper function to find successor node
    function findSuccessorNode(currentNode, previousNode = null) {
      if (currentNode.leftChild === null) {
        return [currentNode, previousNode];
      } else {
        return findSuccessorNode(currentNode.leftChild, currentNode);
      }
    }

    //If value equals node with both a left child and right child
    if (value === node.data && node.leftChild && node.rightChild) {
      //Check for last lowest value node in right tree
      const [successorNode, successorParentNode] = findSuccessorNode(
        node.rightChild,
        node
      );
      //Set deleted node value to successor value
      node.data = successorNode.data;
      //Check if successor node is direct child node
      if (successorParentNode === node) {
        //Sets nodes right pointer to successor nodes right pointer.
        node.rightChild = successorNode.rightChild;
      } else {
        //Set successor nodes parent node left pointer to null??
        successorParentNode.leftChild = successorNode.rightChild;
      }
      return;
    }

    //When node is leaf node
    if (
      value === node.data &&
      node.leftChild === null &&
      node.rightChild === null
    ) {
      //Checks if parent node exists
      if (parentNode === null) {
        this.root = null;
      }
      //When node to be deleted is a leaf node on a left subtree
      else if (parentNode.leftChild === node) {
        parentNode.leftChild = null;
      } else {
        //When node to be deleted is a leaf node on a right subtree
        parentNode.rightChild = null;
      }
      return;
    }

    //If value equals the nodes value and it only has one child
    if (
      (node.leftChild && !node.rightChild && node.data === value) ||
      (!node.leftChild && node.rightChild && node.data === value)
    ) {
      // If parent node doesnt exists
      if (parentNode === null) {
        this.root = node.leftChild || node.rightChild;
      }
      //Checks whether nodes is parents left or right child
      else if (parentNode.rightChild === node) {
        //Sets parents node pointer to whichever child is not null
        parentNode.rightChild = node.leftChild || node.rightChild;
      } else {
        parentNode.leftChild = node.leftChild || node.rightChild;
      }
      return;
    }

    //Recursive Call
    if (value < node.data) {
      return this.deleteItem(value, node.leftChild, node);
    } else {
      return this.deleteItem(value, node.rightChild, node);
    }
  }

  find(value, node = this.root) {
    //Base case
    if (node === null) {
      console.log(`Value ${value} doesn't exist in the tree.`);
      return null;
    }
    //Base case
    if (value === node.data) {
      return node;
    }
    //Recursive search
    if (value < node.data) {
      return this.find(value, node.leftChild);
    } else {
      return this.find(value, node.rightChild);
    }
  }

  levelOrder(callback, array = [this.root]) {
    if (callback === undefined || typeof callback !== "function") {
      throw new Error("Callback function required");
    }
    //If root is null method terminates
    if (this.root === null) {
      return;
    }
    //Controls the queue of items being added to the array
    while (array.length > 0) {
      //Item about to leave queue has its childen added to queue.
      if (array[0].leftChild !== null) {
        array.push(array[0].leftChild);
      }
      if (array[0].rightChild !== null) {
        array.push(array[0].rightChild);
      }
      //Removes item from queue and returns value to callback
      callback(array.shift());
    }
  }

  levelOrderRecursive(callback, array = [this.root]) {
    if (callback === undefined || typeof callback !== "function") {
      throw new Error("Callback function required");
    }
    //If root is null or array becomes empty method terminates
    if (array.length <= 0 || this.root === null) {
      return;
    }
    if (array[0].leftChild !== null) {
      //Item about to leave queue has its left child added to queue
      array.push(array[0].leftChild);
    }
    if (array[0].rightChild !== null) {
      //Item about to leave queue has its right child added to queue
      array.push(array[0].rightChild);
    }
    //Removes item from queue and returns value to callback
    callback(array.shift());

    //Recursive call
    return this.levelOrderRecursive(callback, array);
  }
}
