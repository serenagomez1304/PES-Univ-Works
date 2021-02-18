#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<stdbool.h>

#include"huffman_encode.h"
#include"hash_table.h"
#include"kv_store.h"
#include"lzw.h"
#define EXTERN
#include"lzw_global.h"

//initializing all global variables
void init_global(){
    NC = 0;
    OutIndex = 0;
    OutBufferSize = 10240;
    OutBuffer = (int *)malloc(sizeof(int)*OutBufferSize);
    memset(OutBuffer, 0, OutBufferSize*sizeof(int));
    OutCharBuffer = (char *)malloc(sizeof(char)*OutBufferSize);
    memset(OutCharBuffer, 0, OutBufferSize*sizeof(char));

    InIndex = 0;
    InBufferSize = 10240;
    InBuffer = (char *)malloc(sizeof(char)*InBufferSize);
    memset(InBuffer, 0, InBufferSize*sizeof(char));

    MaxCodeTableSize = 10240;
    Encode_CT = ht_new(MaxCodeTableSize);
    Decode_CT = kv_new(MaxCodeTableSize);
}

void Huffman_encode()
{
    char arr[] = { 'a', 'b', 'c', 'd', 'e', 'f' };
    int freq[] = { 5, 9, 12, 13, 16, 45 };
    int size = sizeof(arr) / sizeof(arr[0]); //length of array
    HuffmanCodes(arr, freq, size);
}

void lzw_encode_file(char* in_file, char* encoded_file) {

    char *code_table_file = "compress_code_file.txt"; //file containing code table

    FILE *in_fp, *out_compress_fp, *out_ct_fp;

    init_global();
    //open each file and checking whether they exist or if there was an error in opening it
    in_fp=fopen(in_file, "r");
    if(in_fp==NULL)
    {
        printf("File does not exist or there is an error in opening %s.\n", in_file);
        exit(1);
    }
    out_compress_fp=fopen(encoded_file, "w");
    if(out_compress_fp==NULL)
    {
        printf("Unable to create file: %s\n", encoded_file);
        exit(1);
    }
    out_ct_fp=fopen(code_table_file, "w");
    if(out_ct_fp==NULL)
    {
        printf("Unable to create file: %s\n", code_table_file);
        exit(2);
    }

    //running through the entire file and preparing the code table
    bool in_eof = false;
    while(in_eof == false) {
        memset(InBuffer, 0, InBufferSize*sizeof(char));
        int i=0;
        while(true){
            char ch;
            ch=fgetc(in_fp);
            printf("%c",ch);
            if(feof(in_fp)) {
                in_eof = true;
                break;
            }

            InBuffer[i]=ch;
            i++;
            if(i >= InBufferSize-1) break;
        }
        printf("\n");
        prepare_code_table(InBuffer, out_compress_fp);
    }
    fclose(in_fp);

    print_output_buffer(out_compress_fp);
    fclose(out_compress_fp);

    print_code_table(out_ct_fp);
    fclose(out_ct_fp);

    printf("\n");
    //print_decoded_string();
}

void lzw_decode_file(char* decode_file, char * out_file) {

    char *code_table_file = "decompress_code_file.txt"; //file containing decode table

    FILE *in_decode_fp, *out_fp, *out_ct_fp;

    init_global();
    //open each file and checking whether they exist or if there was an error in opening it
    in_decode_fp=fopen(decode_file, "r");
    if(in_decode_fp==NULL)
    {
        printf("File does not exist or there is an error in opening %s.\n", decode_file);
        exit(1);
    }
    out_fp=fopen(out_file, "w");
    if(out_fp==NULL)
    {
        printf("Unable to create file: %s\n", out_file);
        exit(1);
    }
    out_ct_fp=fopen(code_table_file, "w");
    if(out_ct_fp==NULL)
    {
        printf("Unable to create file: %s\n", code_table_file);
        exit(2);
    }

    //running through the entire file and preparing the decode table
    bool in_eof = false;
    int code_list[InBufferSize];
    int i = 0;
    char str[32] = "";
    while(true){
        char ch;
        ch=fgetc(in_decode_fp);
        printf("%c",ch);
        if(ch != ' ') {
            strncat(str, &ch, 1);
        } else {
            int val = atoi(str);
            code_list[i] = val;
            i++;
            strcpy(str, "");
        }
        if(feof(in_decode_fp)) {
            in_eof = true;
            break;
        }
    }
    printf("\n");
    prepare_decode_table(code_list, i, out_fp);
    fclose(in_decode_fp);

    print_output_buffer_decode(out_fp);
    fclose(out_fp);

    print_decode_table(out_ct_fp);
    fclose(out_ct_fp);

//    print_decoded_string();
}


int main( int argc, char *argv[] )
{
    // Usage
    // zipper -c romeo.txt -o romeo.lwz
    //      input is romeo.txt
    //      output is romeo.lwz  (compressed file)
    // zipper -d romeo.lzw -o romeo.txt
    //      input is romeo.lzw
    //      output is romeo.txt  (decompressed file)
    if(argc == 2) {
       printf("the arguments supplied is %s\n", argv[1] );
    } else if( argc == 5 ) {
       printf("The argument supplied is %s %s %s %s\n",
                    argv[1], argv[2],
                    argv[3], argv[4]);
    } else {
       printf("Incorrect arguments supplied.\n\n");
       printf("Usage (for lzw encoding): \n");
       printf("         zippers.exe -c romeo.txt -o romeo.lzw\n\n");
       printf("Usage (for lzw decoding): \n");
       printf("         zippers.exe -d romeo.lzw -o romeo.txt\n\n");
       printf("Usage (for huffman encoding): \n");
       printf("         zippers.exe -h\n");
       exit(1);
    }

    if(!((strcmp(argv[1], "-c") == 0) ||
            (strcmp(argv[1], "-d") == 0) ||
            (strcmp(argv[1], "-h") == 0)) &&
            (strcmp(argv[3], "-o") == 0)
        ) {
            printf("Incorrect arguments supplied.\n\n");
            printf("Usage (for lzw encoding): \n");
            printf("         zippers.exe -c romeo.txt -o romeo.lzw\n\n");
            printf("Usage (for lzw decoding): \n");
            printf("         zippers.exe -d romeo.lzw -o romeo.txt\n\n");
            printf("Usage (for huffman encoding): \n");
            printf("         zippers.exe -h\n");
            exit(1);
    }

    if(strcmp(argv[1], "-c") == 0) {
        char *in_file = argv[2];//input file
        char *encoded_file = argv[4];//compressed file
        lzw_encode_file(in_file, encoded_file);
        exit(0);
    }

    if(strcmp(argv[1], "-d") == 0) {
        char *encoded_file = argv[2];//input file
        char *out_file = argv[4];//compressed file
        lzw_decode_file(encoded_file, out_file);
        exit(0);
    }

    if(strcmp(argv[1], "-h") == 0) {
        Huffman_encode();
        exit(0);
    }

}
