FROM centos:7

RUN yum install wget gcc make libdb-dev libncurses5-dev libgmp-dev gmp gmp-devel autoconf -y

RUN wget -O gnu-cobol.tar.gz https://sourceforge.net/projects/open-cobol/files/gnu-cobol/2.2/gnucobol-2.2.tar.gz/download
RUN tar zxf gnu-cobol.tar.gz

WORKDIR gnucobol-2.2
RUN ./configure --without-db
RUN make
RUN make install
RUN make check
RUN make installcheck

COPY docker/cobol/usrlocallib.conf /etc/ld.so.conf.d/usrlocallib.conf
RUN ldconfig -v

COPY src /app/src

WORKDIR /app

RUN cobc -x -free src/main/hello_world.cbl

CMD ["./hello_world"]