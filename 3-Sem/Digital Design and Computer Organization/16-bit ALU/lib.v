module mux2 (input wire i1, i0, j, output wire o);
  assign o = (j==0)?i0:i1;
endmodule

// 16 2:1 multiplexers
module mux2_16 (input wire j, input wire [15:0] i0, i1, output wire [15:0] o);
  
mux2 mux2_0 (i0[0], i1[0], j, o[0]);
mux2 mux2_1 (i0[1], i1[1], j, o[1]);
mux2 mux2_2 (i0[2], i1[2], j, o[2]);
mux2 mux2_3 (i0[3], i1[3], j, o[3]);
mux2 mux2_4 (i0[4], i1[4], j, o[4]);
mux2 mux2_5 (i0[5], i1[5], j, o[5]);
mux2 mux2_6 (i0[6], i1[6], j, o[6]);
mux2 mux2_7 (i0[7], i1[7], j, o[7]); 
mux2 mux2_8 (i0[8], i1[8], j, o[8]); 
mux2 mux2_9 (i0[9], i1[9], j, o[9]);  
mux2 mux2_10 (i0[10], i1[10], j, o[10]); 
mux2 mux2_11 (i0[11], i1[11], j, o[11]); 
mux2 mux2_12 (i0[12], i1[12], j, o[12]);  
mux2 mux2_13 (i0[13], i1[13], j, o[13]); 
mux2 mux2_14 (i0[14], i1[14], j, o[14]); 
mux2 mux2_15 (i0[15], i1[15], j, o[15]);

endmodule