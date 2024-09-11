## Binary Search Tree Data Structure in JavaScript

### Overview
This project implements a balanced Binary Search Tree (BST) data structure using modern JavaScript (ES6). The implementation uses classes and recursive algorithms to manage tree operations like insertion, deletion, traversal, and rebalancing.

### Technologies Used
- **JavaScript (ES6)**: Implements the BST using modern JavaScript features.
- **Classes**: `BSTNode` and `BSTree` classes encapsulate the properties and behaviors of nodes and the tree.
- **Recursion**: Utilized extensively for tree construction, traversal, insertion, deletion, and balancing operations.

### Key Components of the Code
**Constructor and buildTree Method:**
- The constructor initializes the BST with a sorted and deduplicated array using the `buildTree` method.
- `buildTree` recursively constructs a balanced BST from a sorted array by choosing the middle element as the root.

**Pretty Print:**
- A visual representation method (`prettyPrint`) helps print the tree structure in a readable format.

**Insertion (`insert`):**
- Inserts a value into the BST recursively while maintaining the BST properties. It does not allow duplicate values.

**Deletion (`deleteItem`):**
- Deletes a node from the BST. It handles three cases: leaf nodes, nodes with one child, and nodes with two children by replacing them with the successor node.

**Search (`find`):**
- Searches for a specific value in the BST recursively.

**Level Order Traversal (`levelOrder` and `levelOrderRecursive`):**
- Implements iterative and recursive level-order traversal using a callback function to process nodes.

**Depth-First Traversal (`inOrder`, `preOrder`, `postOrder`):**
- Implements in-order, pre-order, and post-order traversal, each accepting a callback function to process nodes.

**Height and Depth Calculation (`height` and `depth`):**
- `height`: Calculates the height of a node in the tree.
- `depth`: Calculates the depth of a node from the root.

**Balance Check and Rebalance (`isBalanced` and `rebalance`):**
- `isBalanced`: Checks if the tree is balanced by comparing the heights of the left and right subtrees.
- `rebalance`: Rebalances the tree if it is unbalanced by constructing a new tree from the sorted node values.
