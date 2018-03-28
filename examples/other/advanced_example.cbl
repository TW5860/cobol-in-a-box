IDENTIFICATION DIVISION.
PROGRAM-ID. ADVANCED-EXAMPLE.
DATA DIVISION.
FILE SECTION.
WORKING-STORAGE SECTION.
    01 input-text PIC X(1).
        88 dir-left VALUE IS "l".
        88 dir-right VALUE IS "r".
        88 dir-forward VALUE IS "f".

PROCEDURE DIVISION.
MAIN-PROCEDURE.
    DISPLAY "You are in a maze."
    GO TO POS-BOTTOM.

POS-BOTTOM.
    DISPLAY "You got to a junction. You can either go left (press l) or right (press r)."
    ACCEPT input-text.
    DISPLAY "---"

    IF dir-left
        DISPLAY "You ended up in a dead end. You turn around."
        GO TO POS-LEFT.

    IF dir-right
        GO TO POS-FINISH.

    DISPLAY "Incorrect input, try again."
    GO TO POS-BOTTOM.

POS-LEFT.
    DISPLAY "You got to a junction. You can either go forward (press f) or turn right (press r)."
    ACCEPT input-text.
    DISPLAY "---"

    IF dir-forward
        GO TO POS-FINISH.

    IF dir-right
        DISPLAY "You ended up in a dead end. You turn around."
        GO TO POS-BOTTOM.

    DISPLAY "Incorrect input, try again."
    GO TO POS-LEFT.

POS-FINISH.
    DISPLAY "You reached the treasure! Yay!"
    STOP RUN.
END PROGRAM ADVANCED-EXAMPLE.
