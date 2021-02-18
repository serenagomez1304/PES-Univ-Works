module shift_right (input wire [3:0] s, input wire [15:0] d_in, output wire [15:0] d_out);

wire [15:0] d_in_0, d_in_1, d_in_2; // outputs of the much at each level
wire [15:0] level_0; // i1 at s0
wire [15:0] level_1; // i1 at s1
wire [15:0] level_2; // i1 at s2
wire [15:0] level_3; // i1 at s3

assign level_3[7:0] = d_in[15:8];
assign level_3[15:8] = 8'b0;

mux2_16 mux2_16_3 (s[3], level_3, d_in, d_in_2);

assign level_2[11:0] = d_in_2[15:4];
assign level_2[15:12] = 4'b0;

mux2_16 mux2_16_2 (s[2], level_2, d_in_2, d_in_1);

assign level_1[13:0] = d_in_1[15:2];
assign level_1[15:14] = 2'b0;

mux2_16 mux2_16_1 (s[1], level_1, d_in_1, d_in_0);

assign level_0[14:0] = d_in_0[15:1];
assign level_0[15] = 1'b0;

mux2_16 mux2_16_0 (s[0], level_0, d_in_0, d_out);

endmodule