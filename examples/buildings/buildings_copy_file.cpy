01 BUILDINGS.
    05 COUNT-OF-BUILDINGS PIC 99.
    05 BUILDING OCCURS 0 TO 99 TIMES DEPENDING ON COUNT-OF-BUILDINGS INDEXED BY I.
        10 BUILDING-NAME PIC X(25).
        10 BUILDING-HEIGHT PIC 9(5).
