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
