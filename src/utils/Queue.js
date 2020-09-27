class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

export default class Queue {

  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  enqueue(value) {
    const node = new Node(value)

    if (this.head) {
      this.tail.next = node
      this.tail = node
    } else {
      this.head = node
      this.tail = node
    }

    this.length++
  }

  dequeue() {
    const current = this.head
    this.head = this.head.next
    this.length--

    return current.value
  }

  print() {
    let current = this.head
    const values = []

    while (current) {
      values.push(current.value)
      current = current.next
    }

    return values
  }

  isEmpty() {
    return this.length === 0
  }

  getHead() {
    return this.head.value
  }

  getLength() {
    return this.length
  }

}

