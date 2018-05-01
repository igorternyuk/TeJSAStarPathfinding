class PriorityQueue {
	constructor(comparator = (a, b) => a > b){
		this._heap = [];
		this._comparator = comparator;
		this.top = 0;
		this.leftChild = i => (i << 1) + 1; // 2 * i + 1
		this.rightChild = i => (i + 1) << 1; // 2 * (i + 1)
		this.parent = i => ((i + 1) >>> 1) - 1; // (i + 1) / 2 - 1
	}

	write(){
		this._heap.forEach(value => { console.log(value + ", "); });
	}

	size(){
		return this._heap.length;
	}

	isEmpty(){
		return this._heap.length === 0;
	}

	push(...values){
		values.forEach(value => {
			this._heap.push(value);
			this._siftUp();
		});
		return this.size();
	}

	pop(){
		const valueToPop = this.peek();
		const bottom = this.size() - 1;
		if(bottom > this.top){
			this._swap(this.top, bottom);
		}
		this._heap.pop();
		this._siftDown();
		return valueToPop;
	}

	peek(){
		return this._heap[this.top];
	}

	_greater(i, j){
		return this._comparator(this._heap[i], this._heap[j]);
	}

	_swap(i, j){
		[this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
	}

	_siftUp(){
		console.log("Sifting up");
		let currentIndex = this.size() - 1;
		let parentIndex = this.parent(currentIndex);
		while(currentIndex > this.top && this._greater(currentIndex, parentIndex)){
			this._swap(currentIndex, parentIndex);
			currentIndex = parentIndex;
			parentIndex = this.parent(currentIndex);
		}
	}

	_siftDown() {
		let currentIndex = this.top;
		let left = this.leftChild(currentIndex);
		let right = this.rightChild(currentIndex);
		let hasLeftChild = left < this.size();
		let hasRightChild = right < this.size();
		//console.log("Sifting down");
		let counter = 0;  
		while((hasLeftChild && this._greater(left, currentIndex))
		 || (hasRightChild && this._greater(right, currentIndex))){
			  ++counter;
		 	  let maxChild = 0;
		 	  if(hasLeftChild && hasRightChild){
		 	  	maxChild = this._greater(left, right) ? left : right;
		 	  } else {
		 	  	maxChild = hasLeftChild ? left : right;
		 	  }
		 	  this._swap(currentIndex, maxChild);
		 	  currentIndex = maxChild;
		 	  left = this.leftChild(currentIndex);
			  right = this.rightChild(currentIndex);
		 	  hasLeftChild = left < this.size();
			  hasRightChild = right < this.size();
		}
		//console.log("counter = " , counter);
	}
}