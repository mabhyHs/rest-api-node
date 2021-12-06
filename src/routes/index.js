const { Router } = require('express');
const router= Router();

router.get('/', (req, res) => {
    res.send({"title": "hello world"});
});

module.exports = router;