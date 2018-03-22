let {execTestDriver} = require('./helpers/test_driver_helper');

describe('Book Stats', () => {
    it('calculates stats for one book', (done) => {
        let books = {
            'books_input': {
                'books': [
                    {
                        'book_title': 'Testbuch',
                        'book_author': 'Testauthor',
                        'book_pages': 25
                    }
                ]
            }
        };
        execTestDriver(books, (stats) => {
            expect(stats.book_stats.max_pages).toBe(25);
            expect(stats.book_stats.min_pages).toBe(25);
            expect(stats.book_stats.avg_pages).toBe(25);
            done();
        });
    });

    it('calculates stats for a few books', (done) => {
        let books = {
            'books_input': {
                'books': [
                    {
                        'book_title': 'Testbuch',
                        'book_author': 'Testauthor',
                        'book_pages': 25
                    },
                    {
                        'book_title': 'Testbuch2',
                        'book_author': 'Testauthor2',
                        'book_pages': 20
                    },
                    {
                        'book_title': 'Testbuch3',
                        'book_author': 'Testauthor3',
                        'book_pages': 30
                    }
                ]
            }
        };
        execTestDriver(books, (stats) => {
            expect(stats.book_stats.max_pages).toBe(30);
            expect(stats.book_stats.min_pages).toBe(20);
            expect(stats.book_stats.avg_pages).toBe(25);
            done();
        });
    });
});