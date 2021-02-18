typedef struct {
    char* key;
    int value;
} ht_item;

typedef struct {
    int size;
    int count;
    ht_item** items;
} ht_hash_table;

ht_hash_table* ht_new(int max_ht_size);
void ht_insert(ht_hash_table* ht, char* key,  int value);
int ht_search(ht_hash_table* ht,  char* key);
char** ht_keys(ht_hash_table* ht);
char* ht_key(ht_hash_table* ht, int value) ;
int ht_count(ht_hash_table* ht);

//void ht_delete(ht_hash_table* h, const char* key);
