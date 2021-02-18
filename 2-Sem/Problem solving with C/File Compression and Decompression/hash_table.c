#include <stdlib.h>
#include <string.h>
#include<math.h>
#include<stdio.h>
#include "hash_table.h"

static ht_item* ht_new_item(const char* k, const int v)
{
    ht_item* i = malloc(sizeof(ht_item));
    i->key = strdup(k);
    i->value = v;
    return i;
}

ht_hash_table* ht_new(int ht_size)
{
    ht_hash_table* ht = malloc(sizeof(ht_hash_table));
    ht->size = ht_size;
    ht->count = 0; //number of items
    ht->items = calloc((size_t)ht->size, sizeof(ht_item*));
    return ht;
}

static void ht_del_item(ht_item* i)
{
    free(i->key);
    free(i);
}

void ht_del_hash_table(ht_hash_table* ht)
{
    for (int i = 0; i < ht->size; i++)
    {
        ht_item* item = ht->items[i];
        if (item != NULL)
        {
            ht_del_item(item);
        }
    }
    free(ht->items);
    free(ht);
}

//generates a hash
static int ht_hash(const char* s, const int a, const int m)
{
    long hash = 0;
    const int len_s = strlen(s);
    for (int i = 0; i < len_s; i++)
    {
        hash += (long)pow(a, len_s - (i+1)) * s[i];
        hash = hash % m;
    }
    return (int)hash;
}

//handles collision
static int ht_get_hash(const char* s, const int num_buckets, const int attempt)
{
    const int hash_a = ht_hash(s, 151, num_buckets);
    const int hash_b = ht_hash(s, 151, num_buckets);
    return (hash_a + (attempt * (hash_b + 1))) % num_buckets;
}

//inserts a new key value pair into the hash table
void ht_insert(ht_hash_table* ht,  char* key,  int value)
{
    //printf("%s, %d\n", key, value);
    if(ht->count >= ht->size) {
        printf("Hash table is full");
    }
    ht_item* item = ht_new_item(key, value);
    int index = ht_get_hash(item->key, ht->size, 0);
    ht_item* cur_item = ht->items[index];
    int i = 1;
    while (cur_item != NULL)
    {
        index = ht_get_hash(item->key, ht->size, i);
        cur_item = ht->items[index];
        i++;
    }
    ht->items[index] = item;
    ht->count++;
}

//searches for a key in the hashtable and returns its value
int ht_search(ht_hash_table* ht,  char* key)
{
    int index = ht_get_hash(key, ht->size, 0);
    ht_item* item = ht->items[index];
    int i = 1;
    while (item != NULL)
    {
        if (strcmp(item->key, key) == 0)
        {
            return item->value;
        }
        index = ht_get_hash(key, ht->size, i);
        item = ht->items[index];
        i++;
    }
    return -1;
}

int ht_count(ht_hash_table* ht) {
    return ht->count;
}

//returns all the keys in the hashtable
char** ht_keys(ht_hash_table* ht)
{
    int i=0, j=0;
    int ht_size = ht->size;
    char** ret=(char**)malloc(sizeof(char*)*(ht->count+1));
    for(i=0;i<ht_size;i++)
    {
        ht_item* item = ht->items[i];
        if(item != NULL){
            ret[j] = item->key;
            j++;
        }
    }
    return ret;
}

//returns the key for a given value
char* ht_key(ht_hash_table* ht, int value) {
    int i=0 ;
    int ht_size = ht->size;
    for(i=0;i<ht_size;i++)
    {
        ht_item* item = ht->items[i];
        if(item != NULL){
            if(value == item->value)
                return item->key;
        }
    }
    return NULL;
}
