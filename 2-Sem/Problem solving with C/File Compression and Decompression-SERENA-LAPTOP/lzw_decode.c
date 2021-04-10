#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#include<stdbool.h>
#include "kv_store.h"
#include "hash_table.h"
#include "lzw.h"
#include "lzw_global.h"

//adds the new string to the code table
void add_to_decode_table(char* s)
{
    // Generate next code
    NC=next_code(NC);
    // If Code Tablesize reach the max limit, resize the code table
    if (kv_length(Decode_CT) >= MaxCodeTableSize-1) {
        MaxCodeTableSize = MaxCodeTableSize * 1.5;
        kv_resize(Decode_CT, MaxCodeTableSize);
    }
    // Insert the new <key, string> to KV Store
    kv_insert(Decode_CT, NC, s);
}

// Get the string for the input code
char* find_in_decode_table(int k)
{
    char* value = kv_value(Decode_CT, k);
    return value;
}

//prints the decode table into a file and on the terminal
void print_decode_table(FILE *ct_fp)
{
    int len = kv_length(Decode_CT);
    int i = 0;
    for(i=0; i < len; i++)
    {
        char* code_value = find_in_decode_table(i);
        fprintf(ct_fp, "%d %s\n", i, code_value);
        //printf("( %d, %s )\n", i, code_value);
    }
}

//initializes the decode Table
void init_decode_table()
{
    int i=1;
    char str[3];
    for(i=1;i<128;i++)
    {
        sprintf(str,"%c",(char)i);
        add_to_decode_table(str);
    }
}

//prepares the decode table
void prepare_decode_table(int *code_list, int len, FILE *cf)
{
    printf("\n");
    //Initialize table with single character strings
    init_decode_table();
    int i, j;
    char ss[1024] = "";
    char c = '\0';
    // OLD = first input code
    char* old = find_in_decode_table(code_list[0]);
    // output translation of OLD
    add_to_output_buffer_decode(old, cf);
    // FOR not end of input stream
    for(i=1;i<len;i++)
    {
        // NEW = next input code
        char * new = find_in_decode_table(code_list[i]);
        //  IF NEW is not in the string table
        if(new == NULL) {
            // SS = translation of OLD
            strcpy(ss, old);
            // SS = SS + C
            strcat(ss, &c);
        } else {
            // SS = translation of NEW
            strcpy(ss, new);
        }
        // output SS
        add_to_output_buffer_decode(ss, cf);
        // C = first character of SS
        char * cc = substr(ss, 0, 1);
        c = cc[0];
        char new_code[1024];
        // OLD + C to the string table
        sprintf(new_code,"%s%c", old, c);
        add_to_decode_table(new_code);
        // OLD = NEW
        old = new;
    } // END FOR
}

void add_to_output_buffer_decode(char *ss, FILE *cf){
    strcat(OutCharBuffer, ss);
    if(strlen(OutCharBuffer) >= OutBufferSize)
    {
        //printf("*******************\n");
        print_output_buffer_decode(cf);
        memset(OutCharBuffer, 0, OutBufferSize);
    }
}

//prints the decode table into a file
void print_output_buffer_decode(FILE *cf)
{
    fprintf(cf, "%s", OutCharBuffer);
    printf("%s", OutCharBuffer);
    printf("\n");
}
