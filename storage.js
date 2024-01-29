export default function getStorage(){
    return { 'books' : [
        {
            title : "Atomic Habits",
            author : "James Clear",
            search : "atomicHabbits.jfif",
            comments : 'best book I ever known',
            id : 0,
            isBefore : true,
            year : 2018,
            totalLoans : 3,
            amount : 14,
            inUse : 1,
            available : true,
            stars : 4
        },
        {
            title : "The 7 habits of highly effective people",
            author : "Stephen R covey",
            search : "7Habbits.jpg",
            comments : 'best book I ever known',
            id : 1,
            isBefore : true,
            year : 1989,
            totalLoans : 3,
            amount : 14,
            inUse : 1,
            available : true,
            stars : 4
        },
        {
            title : "How to win friends and influence people",
            author : "Dale Carnegie",
            search : "makeFriends.jpg",
            comments : 'best book I ever known',
            id : 2,
            isBefore : true,
            year : 1936,
            totalLoans : 2,
            amount : 15,
            inUse : 0,
            available : true,
            stars : 4
        },
        {
            title : "Rich Dad, Poor Dad",
            author : "Robert T. Kiyosaki",
            search : "richDadPoorDad.jpg",
            comments : 'best book I ever known',
            id : 3,
            isBefore : true,
            year : 1997,
            totalLoans : 5,
            amount : 14,
            inUse : 1,
            available : true,
            stars : 4
        },
        {
            title : "The richest man in Babylon",
            author : "George S. Clason",
            search : "richestManBabylon.jpg",
            comments : 'best book I ever known',
            id : 4,
            isBefore : true,
            year : 1926,
            totalLoans : 2,
            amount : 14,
            inUse : 1,
            available : true,
            stars : 4
        },
        {
            title : "Think and grow rich",
            author : "Napaleon Hill",
            search : "thinkAndGrow.jpg",
            comments : 'best book I ever known',
            id : 5,
            isBefore : true,
            year : 1937,
            totalLoans : 4,
            amount : 13,
            inUse : 2,
            available : true,
            stars : 4
        },
    ],
    'users' : [ {
        name : 'Angsar Aidarbek',
        phone : '7712627546',
        email : 'aidarbek.ansar@gmail.com',
        validity: true,
        problems: [],
        totalLoans: 4, 
        inUse : 1,
        search : 'Ans.jpg',
        id : 0,
        isBefore: true
    }, {
        name : 'Aktolkyn Shaikhyslyam',
        phone : '7712752015',
        email : 'shaikhyslyam.aktolkyn@gmail.com',
        validity: true,
        problems: [],
        totalLoans: 4, 
        inUse : 1,
        search : 'Aktoty.jpg',
        id : 1,
        isBefore: true
    }, {
        name : 'Madi Makin',
        phone : '7478909434',
        email : 'makin.madi@gmail.com',
        validity: true,
        problems: ['late return'],
        totalLoans: 4, 
        inUse : 2,
        search : 'Madi.jpg',
        id : 2,
        isBefore: true
    }, {
        name : 'Olzhas Raimbekov',
        phone : '7773693279',
        email : 'raimbekoc.olzhas@gmail.com',
        validity: true,
        problems: ['Book damage'],
        totalLoans: 5, 
        inUse : 1,
        search : 'Olzh.jpg',
        id : 3,
        isBefore: true
    }, {
        name : 'Dinara Arystanbek',
        phone : '7476664722',
        email : 'arystanbek.dinara@gmail.com',
        validity: true,
        problems: [],
        totalLoans: 2, 
        inUse : 1,
        search : 'Dinara.jpg',
        id : 4,
        isBefore: true
    },
    ],
    'loans' : [{
        userId : 0,
        history : [{
            bookId : 3,
            startDate : "2018-01-01",
            endDate: "2018-01-13",
        },
        {
            bookId : 4,
            startDate : "2019-01-01",
            endDate: "2019-01-23",
        },
        {
            bookId : 5,
            startDate : "2022-03-01",
            endDate: "2022-03-18",
        }
    ],
        inUse : [{
            bookId : 0,
            startDate : "2024-01-01",
            endDate: null,
        }]
    }, {
        userId : 1,
        history : [{
            bookId : 2,
            startDate : "2019-01-01",
            endDate: "2019-01-13",
        },
        {
            bookId : 3,
            startDate : "2020-01-01",
            endDate: "2020-01-23",
        },
        {
            bookId : 1,
            startDate : "2021-03-01",
            endDate: "2021-04-13",
        }
    ],
        inUse : [{
            bookId : 5,
            startDate : "2024-01-01",
            endDate: null,
        }]
    }, {
        userId : 2,
        history : [{
            bookId : 3,
            startDate : "2019-04-01",
            endDate: "2019-04-13",
        },
        {
            bookId : 0,
            startDate : "2020-03-01",
            endDate: "2020-03-23",
        }
    ],
        inUse : [{
            bookId : 4,
            startDate : "2024-01-01",
            endDate: null,
        },
        {
            bookId : 1,
            startDate : "2024-01-05",
            endDate: null,
        }]
    }, {
        userId : 3,
        history : [{
            bookId : 3,
            startDate : "2019-04-01",
            endDate: "2019-04-13",
        },
        {
            bookId : 0,
            startDate : "2020-03-01",
            endDate: "2020-03-23",
        }, {
            bookId : 2,
            startDate : "2021-04-01",
            endDate: "2021-04-13",
        }, {
            bookId : 1,
            startDate : "2021-04-01",
            endDate: "2021-04-13",
        }
    ],
        inUse : [{
            bookId : 5,
            startDate : "2024-01-01",
            endDate: null,
        }]
    }, {
        userId : 4,
        history : [{
            bookId : 5,
            startDate : "2021-04-01",
            endDate: "2021-04-13",
        }
    ],
        inUse : [{
            bookId : 3,
            startDate : "2024-01-01",
            endDate: null,
        }]
    }
]}}
