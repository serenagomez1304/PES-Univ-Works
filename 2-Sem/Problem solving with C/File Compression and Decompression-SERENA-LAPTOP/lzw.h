void init_global();
int next_code(int n);
char* substr(char* s,int start,int end);

char *find_key_for_code(int code);
void print_decoded_string();

void init_code_table();
void prepare_code_table(char *s, FILE *cf);
void print_code_table(FILE *ct_fp);
void add_to_output_buffer(char *ss, FILE *cf);
void add_to_output_buffer_decode(char *ss, FILE *cf);
void print_output_buffer(FILE *cf);
void print_output_buffer_decode(FILE *cf);

void init_decode_table();
void prepare_decode_table(int *code_list, int len, FILE *cf);
void print_decode_table(FILE *ct_fp);
char* find_in_decode_table(int k);
void add_to_decode_table(char* s);
