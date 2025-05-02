// Linked List.

class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

export default class LinkedList {
	constructor() {
		this.head = null;
	}
	// append: insert a new node at the end of the linked list
	append(data) {
		const newNode = new Node(data);
		if (!this.head) {
			this.head = newNode;
		} else {
			let current = this.head;
			while (current.next !== null) {
				current = current.next;
			}
			current.next = newNode;
		}
	}
	// Prepend: insert a new node at the beginning of the linked list
	prepend(data) {
		const newNode = new Node(data);
		newNode.next = this.head;
		this.head = newNode;
	}
	// size: give size(length) of the linked list
	size() {
		let count = 0;
		let node = this.head;
		while (node) {
			count++;
			node = node.next;
		}
		return count;
	}
	// getHead: return the first node from linked list
	getHead() {
		return this.head;
	}
	// getTail: return the last node from linked list
	// getTail() { /* this method will also work */
	//     let tail = this.head;
	//     let lastNode;
	//     while (tail !== null) {
	//         lastNode = tail
	//         tail = tail.next;
	//     }
	//     return lastNode
	// }
	getTail() {
		let tail = this.head;
		if (!tail) return null; /* if list is empty return null */
		while (tail.next !== null) {
			tail = tail.next;
		}
		return tail;
	}
	// at: return the value at given index from linked list;
	at(index) {
		if (index < 0)
			return null; /* Early exit for negative index, though below return null will handle, but if index is negative then we can avoid while loop for "efficiency" */
		let count = 0;
		let node = this.head;
		while (node) {
			if (index === count) {
				return node;
			} else {
				count++;
				node = node.next;
			}
		}
		return null;
	}
	// pop: return the last value from linked list.
	pop() {
		let node = this.head;
		let previousNode = null;
		if (!node) return null; /* if list is empty return null */
		while (node.next !== null) {
			previousNode = node;
			node = node.next;
		}
		if (previousNode) {
			previousNode.next = null; /* remove last node */
		} else {
			this.head = null; /* handle case if ony one node exists */
		}
		return node;
	}
	// contains: return true if the given vaue is in linked list || return false;
	contains(data) {
		let node = this.head;
		while (node) {
			if (node.data === data) {
				return true;
			}
			node = node.next;
		}
		return false;
	}
	// find: return the index of node, null if not found;
	find(data) {
		let node = this.head;
		let counter = 0;
		while (node) {
			if (node.data === data) {
				return counter;
			}
			node = node.next;
			counter++;
		}
		return null;
	}
	// toString: return readable fromat of linked list;
	toString() {
		let node = this.head;
		let nodeString = "";
		while (node) {
			/* node !== null */
			nodeString += `( ${node.data} ) -> `;
			node = node.next;
		}
		return nodeString + "null";
	}
	// insertAt: inserts value at given index;
	insertAt(data, index) {
		const newNode = new Node(data);
		if (index == 0) {
			newNode.next = this.head;
			this.head = newNode;
		} else {
			let node = this.head;
			let prevNode = null;
			let counter = 0;
			while (node && counter < index) {
				prevNode = node;
				node = node.next;
				counter++;
			}
			if (counter !== index) return "invalid index";
			prevNode.next = newNode;
			newNode.next = node;
		}
		return this.toString();
	}
	// removeAt: remove value at given index;
	removeAt(index) {
		let node = this.head;
		if (!this.head) return "null";
		if (index === 0) {
			this.head = node.next;
			return this.toString()
		} else {
			let prevNode = null;
			let counter = 0;
			while (node && counter < index) {
				prevNode = node;
				node = node.next;
				counter++;
			}
			if (!node) return "invalid index"; /* inorder to check if node has out of range index */
			prevNode.next = node.next;
		}
		return this.toString();
	}
}

/* let list = new LinkedList();
list.append(5);
list.append("10");
list.append("69");
list.append(6);
console.log(list.getHead());
console.log(list.getTail());
console.log(list.at(10))
console.log(list.pop());
console.log(list.contains(5));
console.log(list.find("10"));
console.log(list.toString());
console.log(list.size())
console.log(list.insertAt(2, 4));
console.log(list.removeAt(4)); */
