#include<stdio.h>
#include"hash_table.h"
#include"kv_store.h"
#include"lzw.h"
#include"lzw_global.h"

char *find_key_for_code(int code)
{
    return ht_key(Encode_CT, code);
}

void print_decoded_string()
{
    int i=0;
    for(i=0 ; i < OutIndex; i++)
    {
        printf("%s", find_key_for_code(OutBuffer[i]));
    }
}
