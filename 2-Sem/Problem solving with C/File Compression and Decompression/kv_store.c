#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "kv_store.h"

kv_table* kv_new(int max_size) {

    kv_table* newTable = (kv_table*)malloc(sizeof(kv_table));
    newTable->size = max_size;
    newTable->length = 0;
    newTable->items = (char**)malloc(max_size * sizeof(char*));
    int i=0;
    for(i=0;i<max_size;i++)
        newTable->items[i] = NULL;

    return newTable;
}

kv_table* kv_resize(kv_table* kvt, int new_size){
    if(kvt->size <= new_size)
        return kvt;
    kv_table* newTable = kv_new(new_size);
    int i=0;
    for(i=0; i < kvt->length; i++){
        kv_insert(newTable, i, kvt->items[i]);
    }
    kv_delete(kvt);
    return newTable;
}

void kv_insert(kv_table* kvt, int key, char* value){
    kvt->items[key] = (char *)malloc(strlen(value));
    strcpy(kvt->items[key], value);
    if(kvt->length < key) // avoid overwritting
        kvt->length = key;
}

//  Get the value for a given key
char* kv_value(kv_table* kvt, int key){
    return kvt->items[key];
}

//  Get the key for a given value
int kv_key(kv_table* kvt, char* value){
    int ret;
    int i=0;
    for(i=0; i < kvt->length; i++){
        char *item_val = kvt->items[i];
        if(strcmp(item_val, value) == 0)
            return i;
    }
    return -1;
}

int kv_length(kv_table* kvt) {
    return kvt->length;
}

void kv_delete(kv_table* kvt) {
    int i;
    for(i=0;i<kvt->length;i++)
        if(kvt->items[i] != NULL)
            free(kvt->items[i]);
    free(kvt->items);
    free(kvt);
}
