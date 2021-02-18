#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#include<stdbool.h>
#include "hash_table.h"
#include "kv_store.h"
#include "lzw.h"
#include "lzw_global.h"

//creating a substring
char* substr(char* s,int start,int end)
{
    int len=end-start;
    if(len>0)
    {
        char* ret=(char*)malloc(sizeof(char)*(len+1));
        memset(ret, 0, sizeof(char)*(len+1));
        strncpy(ret,s+start,len);
        return ret;
    }
    return NULL;
}

//generates the code
int next_code(int n)
{
    n++;
    return n;
}

//adds the new sequence of characters to the code table and generates a code for it
void add_to_code_table(char* s)
{
    //printf("add\n");
    NC=next_code(NC);
    if (ht_count(Encode_CT) >= MaxCodeTableSize-1) {
        printf("Error: Code Table is full \n");
        exit(1);
    }
    ht_insert(Encode_CT, s, NC);
}

//looks for a particular sequence of characters and returns its code
int find_in_code_table(char* s)
{
    int code=ht_search(Encode_CT, s);
    return code;
}

//prints the code table into a file
void print_code_table(FILE *ct_fp)
{
    char** keys = ht_keys(Encode_CT);
    int i = 0;
    while(keys[i] != NULL)
    {
        int code = find_in_code_table(keys[i]);
        fprintf(ct_fp, "%d %s\n", code, keys[i]);
        //printf("( %d, %s )\n", code, keys[i]);
        i++;
    }
}

//prints the code table into a file
void print_output_buffer(FILE *cf)
{
    int i=0;
    for(i=0 ; i < OutIndex; i++)
    {
        fprintf(cf, "%d ", OutBuffer[i]);
        printf("%d ", OutBuffer[i]);
    }
    printf("\n");
}

void add_to_output_buffer(char *ss, FILE *cf){
    OutBuffer[OutIndex]=find_in_code_table(ss);
    int NewOutIndex = (OutIndex+1) % OutBufferSize;
    if(NewOutIndex == 0)
    {
        //printf("*******************\n");
        print_output_buffer(cf);
    }
    OutIndex = NewOutIndex;
}

//initializes the code Table
void init_code_table()
{
    int i=1;
    char str[3];
    for(i=1;i<128;i++)
    {
        sprintf(str,"%c",(char)i);
        add_to_code_table(str);
    }
}

//prepares the code table
void prepare_code_table(char *s, FILE *cf)
{
    init_code_table();
    int i, j;
    int l = strlen(s);
    for(i=0;i<strlen(s);i++)
    {
        j=i+1;
        char *ss = NULL;
        while(true)
        {
            ss=substr(s,i,j);
            int cod=find_in_code_table(ss);
            if(cod==-1)
            {
                add_to_code_table(ss);
                break;
            }
            j++;
            if(j >= l) break;
        }
        if(j == i+1) {
        } else {
            j--;
        }
        ss=substr(s,i,j);
        //printf("%s, %d %d \n", ss, i ,j);
        add_to_output_buffer(ss, cf);
        i=j-1;
    }
}
