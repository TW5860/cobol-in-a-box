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

RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json
COPY .babelrc /app/.babelrc
COPY cobol_unit_test_helper /app/cobol_unit_test_helper
RUN npm install

COPY examples /app/examples

WORKDIR /app/examples/books
RUN cobc -c -free book_stats.cbl
RUN cobc -x -free test_driver.cbl book_stats.o

# RUN cobc -x -free src/main/hello_world.cbl double_height.o

WORKDIR /app
COPY jasmine /app/jasmine
CMD ["npm", "test"]
