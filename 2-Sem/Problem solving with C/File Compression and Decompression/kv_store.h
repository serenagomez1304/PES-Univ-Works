
typedef struct {
    int size;
    int length;
    char** items; // Array of strings, with key is index & value is the string
} kv_table;

kv_table* kv_new(int max_size);
kv_table* kv_resize(kv_table* kvt, int new_size);
void kv_insert(kv_table* kvt, int key,  char* value);
char* kv_value(kv_table* kvt, int key);
int kv_key(kv_table* kvt, char* value) ;
int kv_length(kv_table* kvt);
void kv_delete(kv_table* kvt);
