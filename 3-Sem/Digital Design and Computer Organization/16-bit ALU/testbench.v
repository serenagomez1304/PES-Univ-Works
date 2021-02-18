`timescale 1 ns / 100 ps
`define TESTVECS 16 

module tb;
  reg [3:0] s;
  reg [15:0] d_in;
  wire [15:0] d_out;
  reg [19:0] test_vecs [0:(`TESTVECS-1)];
  integer i;
  initial begin $dumpfile("tb_main.vcd"); $dumpvars(0,tb); end
  initial begin
    test_vecs[0][19:16] = 4'b0000; test_vecs[0][15:0] = 16'hcdef;
    test_vecs[1][19:16] = 4'b0001; test_vecs[1][15:0] = 16'hcdef;
    test_vecs[2][19:16] = 4'b0010; test_vecs[2][15:0] = 16'hcdef;
    test_vecs[3][19:16] = 4'b0011; test_vecs[3][15:0] = 16'hcdef;
    test_vecs[4][19:16] = 4'b0100; test_vecs[4][15:0] = 16'hcdef;
    test_vecs[5][19:16] = 4'b0101; test_vecs[5][15:0] = 16'hcdef;
    test_vecs[6][19:16] = 4'b0110; test_vecs[6][15:0] = 16'hcdef;
    test_vecs[7][19:16] = 4'b0111; test_vecs[7][15:0] = 16'hcdef;
    test_vecs[8][19:16] = 4'b1000; test_vecs[8][15:0] = 16'hcdef;
    test_vecs[9][19:16] = 4'b1001; test_vecs[9][15:0] = 16'hcdef;
    test_vecs[10][19:16] = 4'b1010; test_vecs[10][15:0] = 16'hcdef;
    test_vecs[11][19:16] = 4'b1011; test_vecs[11][15:0] = 16'hcdef;
    test_vecs[12][19:16] = 4'b1100; test_vecs[12][15:0] = 16'hcdef;
    test_vecs[13][19:16] = 4'b1101; test_vecs[13][15:0] = 16'hcdef;
    test_vecs[14][19:16] = 4'b1110; test_vecs[14][15:0] = 16'hcdef;
    test_vecs[15][19:16] = 4'b1111; test_vecs[15][15:0] = 16'hcdef;
  end
  initial {s, d_in} = 0;
  shift_right shift_right_test (s, d_in, d_out);
  initial begin
    #6 for(i=0;i<`TESTVECS;i=i+1)
      begin #10 {s, d_in}=test_vecs[i]; end
    #100 $finish;
  end
endmodule
