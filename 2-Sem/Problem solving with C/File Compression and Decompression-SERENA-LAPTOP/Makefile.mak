zippers.exe: main.o lzw_test.o lzw_encode.o lzw_decode.o hash_table.o kv_store.o huffman_encode.o
    gcc main.o lzw_test.o lzw_encode.o lzw_decode.o hash_table.o kv_store.o huffman_encode.o -o zippers.exe
main.o: main.c hash_table.h kv_store.h lzw.h lzw_global.h
    gcc -c main.c
lzw_test.o: lzw_test.c hash_table.h kv_store.h lzw.h lzw_global.h
    gcc -c lzw_test.c
lzw_encode.o: lzw_encode.c hash_table.h kv_store.h lzw.h lzw_global.h
    gcc -c lzw_encode.c
lzw_decode.o: lzw_decode.c hash_table.h kv_store.h lzw.h lzw_global.h
    gcc -c lzw_decode.c
hash_table.o: hash_table.c hash_table.h
    gcc -c hash_table.c
kv_store.o: kv_store.c kv_store.h
	gcc -c kv_store.c
huffman_encode.o: huffman_encode.c huffman_encode.h
	gcc -c huffman_encode.c
