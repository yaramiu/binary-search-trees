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
