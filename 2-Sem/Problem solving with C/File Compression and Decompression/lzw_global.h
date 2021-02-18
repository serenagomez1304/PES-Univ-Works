#ifndef EXTERN
#define EXTERN extern
#endif

EXTERN int NC;
EXTERN int OutIndex;
EXTERN int OutBufferSize;
EXTERN int *OutBuffer;

EXTERN int InIndex;
EXTERN int InBufferSize;
EXTERN char *InBuffer;

EXTERN int MaxCodeTableSize;
EXTERN ht_hash_table* Encode_CT;
EXTERN kv_table* Decode_CT;

EXTERN char *OutCharBuffer;
