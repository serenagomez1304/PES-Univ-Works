#include <stdio.h>
#include <stdlib.h>
#define MAX_TREE_HT 100 //height of tree
#include"huffman_encode.h"

// creating new node
struct MinHeapNode* newNode(char data, unsigned freq) {
	struct MinHeapNode* temp = (struct MinHeapNode*)malloc(sizeof(struct MinHeapNode));
    temp->left = temp->right = NULL;
	temp->data = data;
	temp->freq = freq;
    return temp;
}

// create minheap of given capacity
struct MinHeap* createMinHeap(unsigned capacity) {
struct MinHeap* minHeap = (struct MinHeap*)malloc(sizeof(struct MinHeap));
	minHeap->size = 0;
    minHeap->capacity = capacity;
    minHeap->array = (struct MinHeapNode**)malloc(minHeap-> capacity * sizeof(struct MinHeapNode*));
	return minHeap; //since the array is a collection of pointers to each node,we have capacity*sizeofnode
}

// swaps 2 nodes^^involved in minheap creation
void swapMinHeapNode(struct MinHeapNode** a,struct MinHeapNode** b) {
    struct MinHeapNode* t = *a;
	*a = *b;
	*b = t;
}

// The standard minHeapify function.^^involved in minheap creation
void minHeapify(struct MinHeap* minHeap, int idx) {
    int smallest = idx;
	int left = 2 * idx + 1;
	int right = 2 * idx + 2;
    if (left < minHeap->size && minHeap->array[left]->
freq < minHeap->array[smallest]->freq)
		smallest = left;

	if (right < minHeap->size && minHeap->array[right]->
freq < minHeap->array[smallest]->freq)
		smallest = right;

	if (smallest != idx) {
		swapMinHeapNode(&minHeap->array[smallest],
						&minHeap->array[idx]);
		minHeapify(minHeap, smallest);
	}
}

//checking if size of heap is one
int isSizeOne(struct MinHeap* minHeap) {
    return (minHeap->size == 1);
}

// extract minimum value node from heap
struct MinHeapNode* extractMin(struct MinHeap* minHeap) {
    struct MinHeapNode* temp = minHeap->array[0];
    minHeap->array[0] = minHeap->array[minHeap->size - 1];
    --minHeap->size;
	minHeapify(minHeap, 0);
    return temp;
}

// inserting new node to the heap
void insertMinHeap(struct MinHeap* minHeap, struct MinHeapNode* minHeapNode) {
    ++minHeap->size;
	int i = minHeap->size - 1;
    while (i && minHeapNode->freq < minHeap->array[(i - 1) / 2]->freq) {
        minHeap->array[i] = minHeap->array[(i - 1) / 2];
		i = (i - 1) / 2;
	}

	minHeap->array[i] = minHeapNode;
}

// function to build min heap
void buildMinHeap(struct MinHeap* minHeap) {
	int n = minHeap->size - 1;
	int i;
    for (i = (n - 1) / 2; i >= 0; --i)
		minHeapify(minHeap, i);
}

void printArr(int arr[], int n) {//print array ie codes
	int i;
	for (i = 0; i < n; ++i)
		printf("%d", arr[i]);
    printf("\n");
}

int isLeaf(struct MinHeapNode* root) { //check if the node is a root node
    return !(root->left) && !(root->right);
}

struct MinHeap* createAndBuildMinHeap(char data[], int freq[], int size) { // creates minheap of capacity size and insert all nodes
    struct MinHeap* minHeap = createMinHeap(size);
    for (int i = 0; i < size; ++i)
		minHeap->array[i] = newNode(data[i], freq[i]);
    minHeap->size = size;
	buildMinHeap(minHeap);
    return minHeap;
}

// Function that drives the rest of the code
struct MinHeapNode* buildHuffmanTree(char data[], int freq[], int size) {
	struct MinHeapNode *left, *right, *top;
	struct MinHeap* minHeap = createAndBuildMinHeap(data, freq, size); //create minheap of capacity equal to size
    // while size of heap is not 1
	while (!isSizeOne(minHeap)) {
		left = extractMin(minHeap); //finding the ones with least freq
		right = extractMin(minHeap);
		top = newNode('$', left->freq + right->freq);//creating internal node with frequency sum of the two
        top->left = left;
		top->right = right;
        insertMinHeap(minHeap, top);//inserting created node to minheap
	}
	return extractMin(minHeap); //remaining is the root node
}

// assigns and prints codes from root
void printCodes(struct MinHeapNode* root, int arr[], int top) {
    if (root->left) { //0 to left branches
        arr[top] = 0;
		printCodes(root->left, arr, top + 1);
	}
	if (root->right) { //1 to right branches
        arr[top] = 1;
		printCodes(root->right, arr, top + 1);
	}
	if (isLeaf(root)) { //if it is a leaf,code printed
        printf("%c: ", root->data);
		printArr(arr, top);
	}
}

void HuffmanCodes(char data[], int freq[], int size) { //costruct tree and print codes
	struct MinHeapNode* root = buildHuffmanTree(data, freq, size);
	int arr[MAX_TREE_HT], top = 0;
    printCodes(root, arr, top);
}
