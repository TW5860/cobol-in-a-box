IDENTIFICATION DIVISION.
PROGRAM-ID. HELLO.

DATA DIVISION.
   WORKING-STORAGE SECTION.
        COPY "src/main/buildings_copy_file.cpy".
        01 WS-CONCAT PIC X(100).
        01 WS-INDEX-FOR-STRING PIC 9(2).
        01 WS-HEIGHT PIC 9(2).

PROCEDURE DIVISION.
main-paragraph.
   MOVE 3 TO COUNT-OF-BUILDINGS.
   PERFORM write-data VARYING I FROM 1 BY 1 UNTIL I > COUNT-OF-BUILDINGS.

   CALL 'DOUBLE-HEIGHT' USING BUILDINGS.

   PERFORM print-result VARYING I FROM 1 BY 1 UNTIL I > COUNT-OF-BUILDINGS.
   STOP RUN.

write-data.
   MOVE I TO WS-INDEX-FOR-STRING.
   STRING 'Building '          DELIMITED BY SIZE
          WS-INDEX-FOR-STRING  DELIMITED BY SIZE
          INTO WS-CONCAT
   END-STRING.
   COMPUTE WS-HEIGHT = 33 * I.
   MOVE WS-CONCAT TO BUILDING-NAME(I).
   MOVE WS-HEIGHT TO BUILDING-HEIGHT(I).
   DISPLAY "Wrote content nr "WS-INDEX-FOR-STRING.
   DISPLAY "Building name is "BUILDING-NAME(I).
   DISPLAY "Building height is "BUILDING-HEIGHT(I).
   DISPLAY "==========".

print-result.
   MOVE I TO WS-INDEX-FOR-STRING.
   STRING 'Building '             DELIMITED BY SIZE
          WS-INDEX-FOR-STRING     DELIMITED BY SIZE
          ' has height '          DELIMITED BY SIZE
          BUILDING-HEIGHT(I)      DELIMITED BY SIZE
          INTO WS-CONCAT
   END-STRING.
   DISPLAY WS-CONCAT.
