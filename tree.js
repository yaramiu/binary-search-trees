import { Node } from "./node.js";

class Tree {
  constructor(array = []) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const uniqueArray = [...new Set(array)];
    const uniqueSortedArray = uniqueArray.sort((a, b) => a - b);

    function createBST(sortedArray, start, end) {
      if (start > end) {
        return null;
      }

      const mid = Math.floor((start + end) / 2);

      const root = new Node(sortedArray[mid]);

      root.left = createBST(sortedArray, start, mid - 1);
      root.right = createBST(sortedArray, mid + 1, end);

      return root;
    }

    const root = createBST(uniqueSortedArray, 0, uniqueSortedArray.length - 1);

    return root;
  }

  insert(value) {
    function insertToLeafNode(currentNode, nodeToInsert) {
      if (currentNode === null) {
        return nodeToInsert;
      }

      if (nodeToInsert.data < currentNode.data) {
        currentNode.left = insertToLeafNode(currentNode.left, nodeToInsert);
      } else {
        currentNode.right = insertToLeafNode(currentNode.right, nodeToInsert);
      }

      return currentNode;
    }

    if (this.find(value)) {
      return;
    }

    const newNode = new Node(value);
    this.root = insertToLeafNode(this.root, newNode);
  }

  deleteItem(value) {
    function findReplacement(currentNode) {
      if (currentNode.left) {
        currentNode = findReplacement(currentNode.left);
      }
      return currentNode;
    }

    function deleteNode(currentNode, nodeToDelete) {
      if (currentNode === null) {
        return currentNode;
      }

      if (nodeToDelete.data < currentNode.data) {
        currentNode.left = deleteNode(currentNode.left, nodeToDelete);
      } else if (nodeToDelete.data > currentNode.data) {
        currentNode.right = deleteNode(currentNode.right, nodeToDelete);
      } else {
        if (!currentNode.left) {
          return currentNode.right;
        } else if (!currentNode.right) {
          return currentNode.left;
        }

        const replacementNode = findReplacement(currentNode.right);
        deleteNode(currentNode, replacementNode);
        currentNode.data = replacementNode.data;
      }

      return currentNode;
    }

    const nodeToDelete = new Node(value);
    this.root = deleteNode(this.root, nodeToDelete);
  }

  find(value) {
    function findNode(currentNode, nodeToFind) {
      if (!currentNode) {
        return null;
      }

      if (currentNode.data === nodeToFind.data) {
        return currentNode;
      }

      if (currentNode.data > nodeToFind.data) {
        currentNode = findNode(currentNode.left, nodeToFind);
      } else {
        currentNode = findNode(currentNode.right, nodeToFind);
      }

      return currentNode;
    }

    const nodeToFind = new Node(value);
    return findNode(this.root, nodeToFind);
  }

  levelOrder(callback = null) {
    if (!this.root) {
      return null;
    }

    const values = [];
    const queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (callback) {
        callback(currentNode);
      } else {
        values.push(currentNode.data);
      }

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    if (!callback) {
      return values;
    }
  }

  inOrder(callback = null) {
    function inOrderRecursive(currentNode, callback = null) {
      if (!currentNode) {
        return;
      }

      inOrderRecursive(currentNode.left, callback);
      if (callback) {
        callback(currentNode);
      } else {
        values.push(currentNode.data);
      }
      inOrderRecursive(currentNode.right, callback);
    }

    if (!this.root) {
      return null;
    }
    const values = [];
    inOrderRecursive(this.root, callback);
    if (!callback) {
      return values;
    }
  }

  preOrder(callback = null) {
    function preOrderRecursive(currentNode, callback = null) {
      if (!currentNode) {
        return;
      }

      if (callback) {
        callback(currentNode);
      } else {
        values.push(currentNode.data);
      }
      preOrderRecursive(currentNode.left, callback);
      preOrderRecursive(currentNode.right, callback);
    }

    if (!this.root) {
      return null;
    }
    const values = [];
    preOrderRecursive(this.root, callback);
    if (!callback) {
      return values;
    }
  }

  postOrder(callback = null) {
    function postOrderRecursive(currentNode, callback = null) {
      if (!currentNode) {
        return;
      }

      postOrderRecursive(currentNode.left, callback);
      postOrderRecursive(currentNode.right, callback);
      if (callback) {
        callback(currentNode);
      } else {
        values.push(currentNode.data);
      }
    }

    if (!this.root) {
      return null;
    }
    const values = [];
    postOrderRecursive(this.root, callback);
    if (!callback) {
      return values;
    }
  }

  height(node) {
    if (!node) {
      return 0;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (leftHeight > rightHeight) {
      return leftHeight + 1;
    } else {
      return rightHeight + 1;
    }
  }

  depth(node) {
    function findDepth(currentNode, nodeToFind, currentDepth = 0) {
      if (!currentNode) {
        return 0;
      }

      if (currentNode.data === nodeToFind.data) {
        return currentDepth;
      }

      if (currentNode.data > nodeToFind.data) {
        currentDepth = findDepth(currentNode.left, nodeToFind, ++currentDepth);
      } else {
        currentDepth = findDepth(currentNode.right, nodeToFind, ++currentDepth);
      }

      return currentDepth;
    }

    return findDepth(this.root, node);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
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
};
