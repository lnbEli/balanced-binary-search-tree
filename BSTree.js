import mergeSort from "../merge-sort/merge-sort.js";
import BSTNode from "./BSTNode.js";
export default class BSTree {
  constructor(arr) {
    this.root = this.buildTree(arr, true);
  }

  // Method to build a balanced BST
  buildTree(array, initialCall = false) {
    //If no array added then create root node
    //Test!
    if (array === undefined) {
      return new BSTNode();
    }
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
    //Checks if first value to be added to tree
    if (this.root.data === null) {
      this.root.data = value;
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

  //Traverse the tree in respective depth-first order and pass each node to the provided callback.
  //left>root>right
  inOrder(callback, node = this.root) {
    if (callback === undefined || typeof callback !== "function") {
      throw new Error("Callback function required");
    }
    if (node === null) {
      return;
    }
    this.inOrder(callback, node.leftChild);
    callback(node);
    this.inOrder(callback, node.rightChild);
  }
  //root>left>right
  preOrder(callback, node = this.root) {
    if (callback === undefined || typeof callback !== "function") {
      throw new Error("Callback function required");
    }
    if (node === null) {
      return;
    }
    callback(node);
    this.inOrder(callback, node.leftChild);
    this.inOrder(callback, node.rightChild);
  }
  //left>right>root
  postOrder(callback, node = this.root) {
    if (callback === undefined || typeof callback !== "function") {
      throw new Error("Callback function required");
    }
    if (node === null) {
      return;
    }
    this.inOrder(callback, node.leftChild);
    this.inOrder(callback, node.rightChild);
    callback(node);
  }
  //Returns the given node’s height. Height is defined as the number of edges in the longest path from a given node to a leaf node.
  //At moment find sortest path
  height(node, counter = 0) {
    //Initial set to counter incase right of left child doesn't exist.
    //This allows it to be compared in last return staement of the function
    let leftTree = counter;
    let rightTree = counter;
    //If node doesn't exist
    if (node === null) {
      console.log("Node doesn't exist");
      return -1;
    }

    //Base case. When both children are null it is a leaf node
    if (node.leftChild === null && node.rightChild === null) {
      return counter;
    }

    //Recursive step.
    if (node.rightChild) {
      rightTree = this.height(node.rightChild, counter + 1);
    }
    if (node.leftChild) {
      leftTree = this.height(node.leftChild, counter + 1);
    }
    // Checks highest counter value at each barcnch and returns it up the tree
    return leftTree > rightTree ? leftTree : rightTree;
  }
  //Returns the given node’s depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node.
  depth(node, traverseNode = this.root, counter = 0) {
    //Base case
    if (node === traverseNode) {
      return counter;
    }
    //Recursive search
    if (node.data < traverseNode.data) {
      return this.depth(node, traverseNode.leftChild, ++counter);
    } else {
      return this.depth(node, traverseNode.rightChild, ++counter);
    }
  }

  //Checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.

  isBalanced(node = this.root) {
    let left = true;
    let right = true;
    //Checks differnce in height between two branches and if higher than one returns false.
    if (
      Math.abs(this.height(node.leftChild) - this.height(node.rightChild)) > 1
    ) {
      return false;
    }

    //Base case. When reaches a leaf node left and right must be equal and therefore balanced
    if (node.leftChild === null && node.rightChild === null) {
      return true;
    }

    //If left child exists recursively calls it to check if it's balanced
    if (node.leftChild) {
      left = this.isBalanced(node.leftChild);
    }
    //If right child exists recursively calls it to check if it's balanced
    if (node.rightChild) {
      right = this.isBalanced(node.rightChild);
    }

    //If either of the trees are unbalanced returns false
    if (left && right) {
      return true;
    } else {
      return false;
    }
  }
}
