IDENTIFICATION DIVISION.
PROGRAM-ID. HELLO.

DATA DIVISION.
   WORKING-STORAGE SECTION.
   01 IN-VAL1 PIC X(10) VALUE "test".
   01 IN-VAL2 PIC X(10) VALUE "world".

PROCEDURE DIVISION.
   DISPLAY "Input Value 1: "IN-VAL1.
   DISPLAY "Input Value 2: "IN-VAL2.
   CALL 'DISPLAY-TEXTS' USING IN-VAL1 IN-VAL2.
STOP RUN.
