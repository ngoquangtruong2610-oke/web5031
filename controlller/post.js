let posts =[
{id: 1, title :" Bai viet 1", content : "Noi dung bai viet 1"},
{id: 2, title :" Bai viet 2", content : "Noi dung bai viet 2"},
{id: 3, title :" Bai viet 3", content : "Noi dung bai viet 3"},
{id: 4, title :" Bai viet 4", content : "Noi dung bai viet 4"},
];

export function getPosts(req,res){
    res.json(posts);
}

export function getPostsById(req,res) {}
export function addPosts(req,res) {}
export function updatePosts(req,res) {}
export function deletePosts(req,res) {}

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Posts API!',
        available_endpoints: {
            greet: '/api/posts/greet?name=Ken',
            sum: '/api/posts/sum?a=5&b=3'
        }
    });
});

router.get('/greet', (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.json({
            error: 'Vui lòng cung cấp tham số name',
            example: '/api/posts/greet?name=Ken'
        });
    }

    res.json({
        message: `Xin chào ${name}!`,
        greeting: `Hello ${name}, welcome to our API!`
    });
});

router.get('/sum', (req, res) => {
    const { a, b } = req.query;

    if (!a || !b) {
        return res.json({
            error: 'Vui lòng cung cấp cả hai tham số a và b',
            example: '/api/posts/sum?a=5&b=3'
        });
    }

    const numA = parseInt(a);
    const numB = parseInt(b);

    if (isNaN(numA) || isNaN(numB)) {
        return res.json({
            error: 'a và b phải là số hợp lệ',
            example: '/api/posts/sum?a=5&b=3'
        });
    }

    const sum = numA + numB;

    res.json({
        a: numA,
        b: numB,
        sum,
        calculation: `${numA} + ${numB} = ${sum}`
    });
});

module.exports = router;