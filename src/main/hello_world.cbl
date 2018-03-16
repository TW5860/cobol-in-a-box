IDENTIFICATION DIVISION.
PROGRAM-ID. HELLO.

DATA DIVISION.
   WORKING-STORAGE SECTION.
        COPY "src/main/copystrecke.cpy".
        01 WS-CONCAT PIC X(25).
        01 WS-INDEX-FOR-STRING PIC 9(2).

PROCEDURE DIVISION.
main-paragraph.
   PERFORM write-data VARYING I FROM 1 BY 1 UNTIL I >3.
   MOVE 3 TO COUNT-OF-BUILDINGS.
   CALL 'DISPLAY-TEXTS' USING BUILDINGS.
   STOP RUN.

write-data.
   MOVE I TO WS-INDEX-FOR-STRING.
   STRING 'Building '          DELIMITED BY SIZE
          WS-INDEX-FOR-STRING  DELIMITED BY SIZE
          INTO WS-CONCAT
   END-STRING.
   MOVE WS-CONCAT TO BUILDING-NAME(I).
   MOVE "33" TO BUILDING-HEIGHT(I).
   DISPLAY "Wrote content nr "WS-INDEX-FOR-STRING.
