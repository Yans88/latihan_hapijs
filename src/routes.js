const { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler } = require('./handlerBooks');
const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require('./handlerNotes');

const routes = [

    //submission Yansen
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
        options: {
            cors: {
                origin: ['*'],
            },
        },
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
        options: {
            cors: {
                origin: ['*'],
            },
        },
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByIdHandler,
        options: {
            cors: {
                origin: ['*'],
            },
        },
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookByIdHandler,
        options: {
            cors: {
                origin: ['*'],
            },
        },
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookByIdHandler,
        options: {
            cors: {
                origin: ['*'],
            },
        },
    },

    //belajar notes
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
        options: {
            cors: {
                origin: ['*'],
            },
        },
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
        options: {
            cors: {
                origin: ['*'],
            },
        },
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
        options: {
            cors: {
                origin: ['*'],
            },
        },
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
        options: {
            cors: {
                origin: ['*'],
            },
        },
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
        options: {
            cors: {
                origin: ['*'],
            },
        },
    },

];

module.exports = routes;