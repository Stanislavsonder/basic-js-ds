const { NotImplementedError } = require('../extensions/index.js');

// import { Node } from '../extensions/list-tree.js';

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

function Node(value) {
  this.data = value
  this.left = null
  this.right = null
}

module.exports = class BinarySearchTree {

  #root = null

  root() {
    return this.#root
  }

  add(value) {
    if (!this.#root) {
      this.#root = new Node(value)
      return
    }
    let node = this.#root
    let parent
    while (node) {
      parent = node
      node = value < node.data? node.left:node.right
      if (!node) {
        value < parent.data?
            parent.left = new Node(value):
            parent.right = new Node(value)
        break
      }
    }
  }

  has(value) {
    let node = this.#root
    while (node) {
      if (node.data === value) return true
      node = value < node.data? node.left : node.right
    }
    return false
  }

  find(value) {
    let node = this.#root
    while (node) {
      if (node.data === value) return node
      node = value < node.data? node.left : node.right
    }
    return null
  }

  remove(value) {
    if (!this.#root) return


    let curr = this.#root
    let parent = null

    while (curr && curr.data != value){
      parent = curr
      if (curr.data > value) curr = curr.left
      else curr = curr.right
    }

    if (!curr) return

    if (curr.left == null) {
      console.log('Вместо curr подвешивается его правое поддерево')
      if (parent && parent.left == curr) parent.left = curr.right
      if (parent && parent.right == curr) parent.right = curr.right
      curr = null
      return
    }

    if (curr.right == null) {
      console.log('Вместо curr подвешивается его левое поддерево')
      if (parent && parent.left == curr) parent.left = curr.left;
      if (parent && parent.right == curr) parent.right = curr.left;
      curr = null
      return
    }


    console.log('У элемента есть два потомка, тогда на место элемента поставим наименьший элемент из его правого поддерева')
    let replace = curr.right
    while (replace.left) replace = replace.left
    let replaceValue = replace.data
    this.remove(replaceValue)
    curr.data = replaceValue
  }

  min() {
    if (!this.#root) return null
    let node = this.#root
    while (node.left){
      node = node.left
    }
    return node.data
  }

  max() {
    if (!this.#root) return null
    let node = this.#root
    while (node.right){
      node = node.right
    }
    return node.data
  }

}