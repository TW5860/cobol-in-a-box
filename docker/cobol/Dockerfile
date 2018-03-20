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

RUN wget -O nodejs.tar.gz http://nodejs.org/dist/v0.10.30/node-v0.10.30-linux-x64.tar.gz
RUN tar --strip-components 1 -xzvf nodejs.tar.gz -C /usr/local

COPY docker/cobol/usrlocallib.conf /etc/ld.so.conf.d/usrlocallib.conf
RUN ldconfig -v

COPY package.json /app/package.json
COPY .babelrc /app/.babelrc
WORKDIR /app
RUN npm install

COPY src /app/src

RUN cobc -c -free src/main/double_height.cbl
RUN cobc -x -free src/main/test_driver.cbl double_height.o

# RUN cobc -x -free src/main/hello_world.cbl double_height.o

CMD ["./src/test/execute_test.sh"]
