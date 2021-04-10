// node
struct MinHeapNode {
	char data;
	unsigned freq;
	struct MinHeapNode *left, *right; //l n' r child of the node
};

// minheap-collection of nodes
struct MinHeap {
	unsigned size;
	unsigned capacity;
	struct MinHeapNode** array; // Array of minheap node pointers -array which contains pointers to the nodes
};

void HuffmanCodes(char data[], int freq[], int size);
