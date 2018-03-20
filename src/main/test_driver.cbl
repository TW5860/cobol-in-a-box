IDENTIFICATION DIVISION.
PROGRAM-ID. DOUBLE-HEIGHT-TEST-DRIVER.

ENVIRONMENT DIVISION.
    INPUT-OUTPUT SECTION.
    FILE-CONTROL.
    SELECT SYSIN ASSIGN TO KEYBOARD ORGANIZATION LINE SEQUENTIAL.

DATA DIVISION.
    FILE SECTION.
    FD SYSIN
        RECORDING MODE IS V
        RECORD IS VARYING IN SIZE
        FROM 0 TO 99.
    01  INPUT-RECORD PIC X(1).

    WORKING-STORAGE SECTION.
        COPY "src/main/buildings_copy_file.cpy".



PROCEDURE DIVISION.
main-paragraph.
    OPEN INPUT SYSIN.
    READ SYSIN INTO BUILDINGS
    END-READ.
    CLOSE SYSIN.

    CALL 'DOUBLE-HEIGHT' USING BUILDINGS.

    DISPLAY BUILDINGS.
    STOP RUN.
