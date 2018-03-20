# Cobol in a Box

This repository demonstrates how to test COBOL programs with Jasmine
tests written in JavaScript.

## Requirements

All you need is Docker and docker-compose.

## Getting Started

Just run `docker-compose up --build` in the root directory of this
repository.

What this will do?

1. Build a Docker container with GnuCOBOL and Node.js installed
2. Compile your COBOL code (found in [src/main](src/main))
3. Run `npm test`, which will invoke Jasmine.
4. Jasmine will now run all your spec files in [src/spec](src/spec).

## How does it work?

Together with the actual COBOL code, [test_driver](src/main/test_driver.cbl)
gets compiled. This is a program that just reads the used data structure
from stdin and prints the result to stdout. This test driver is needed
to allow testing of COBOL programs with parameters.

The Jasmine tests use [test_driver_helper](src/spec/helpers/test_driver_helper.js)
for interacting with this `test_driver`. This helper just uses
stdin and stdout to communicate with COBOL.