const { nanoid } = require('nanoid');
const { books, results } = require('./bookshelf');

const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;
    const parseReadPage = isNaN(parseInt(readPage)) ? 0 : parseInt(readPage);
    const parsePageCount = isNaN(parseInt(pageCount)) ? 0 : parseInt(pageCount);
    if (name === '' || name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if (parsePageCount === 0) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi Page Count',
        });
        response.code(400);
        return response;
    }
    if (parseReadPage > parsePageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    let finished = false;
    if (pageCount === readPage) finished = true;
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        insertedAt,
        updatedAt,
        finished
    };
    const newRes = { id, name, publisher };
    results.push(newRes);
    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllBooksHandler = (request, h) => {
    // console.log(request.query);

    let res = [];
    let dt = {};
    let response = {};
    let sttsReading = false;
    let sttsFinished = false;
    const { name } = request.query;
    //if(name && name !== undefined) books.filter((n) => n.name.toLowerCase() === name.toLowerCase());
    //if(name && name !== undefined) books.find((n) => n.name.toLowerCase() === name.toLowerCase());

    if (request.query.reading !== undefined) {
        const reading = parseInt(request.query.reading);
        sttsReading = reading === 1 ? true : false;
    }
    if (request.query.finished !== undefined) {
        const finished = parseInt(request.query.finished);
        sttsFinished = finished === 1 ? true : false;
    }
    if (books.length > 0) {
        books.forEach(obj => {
            let newRes = '';
            Object.entries(obj).forEach(([key, value]) => {
                dt[key] = value;
                if ((sttsReading === dt['reading']) || sttsFinished === dt['finished']) {
                    newRes = {
                        id: dt['id'],
                        name: dt['name'],
                        publisher: dt['publisher']
                    };
                }
            });

            res = newRes !== '' ? [...res, newRes] : [...res];
        });
    }
    response = h.response({
        status: 'success',
        data: {
            books: res
        }
    });
    response.code(200);
    return response;;
};

const getBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const book = books.filter((n) => n.id === id)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;
    const updatedAt = new Date().toISOString();
    const parseReadPage = isNaN(parseInt(readPage)) ? 0 : parseInt(readPage);
    const parsePageCount = isNaN(parseInt(pageCount)) ? 0 : parseInt(pageCount);
    if (name === '' || name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if (parsePageCount === 0) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi Page Count',
        });
        response.code(400);
        return response;
    }
    if (parseReadPage > parsePageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    let finished = false;
    if (pageCount === readPage) finished = true;
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished,
            updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler };