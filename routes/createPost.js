const express = require("express");
const router = express.Router();
const firestore = require("firebase/firestore");
const db = firestore.getFirestore();


const submitForm = `
    <form action="/create/submit">
        <label>Title
            <input type="text" name="postTitle" />
        </label>

        <label>Text
            <input type="text" name="postText" />
        </label>

        <label>Author
            <input type="text" name="author" />
        </label>

        <button type="submit">Submit</button>
    </form>
`;

router.get ("/", (req, res) => {
    res.send(submitForm);
});

router.get ("/submit", (req, res) => {

    const queryParams = req.query; //Query Params from URL
    const title = queryParams.postTitle;
    const text = queryParams.postText;
    const author = queryParams.author;

    //Create Dynamic ID w/ RegEx
    const id = title.replace(/\s+/g, "-").toLowerCase();
    // Submit post to Firebase
    const setBlogPost = firestore.setDoc(firestore.doc(db, "posts", id), {
            postTitle: title,
            postText: text,
            author: author,
        });

    setBlogPost
        .then(() => {
        // Successful
        res.send(`
            <h1>Thanks</h1>
            <p><a href="/create">Submit Another Post</a>.</p>
        `);
        })
        .catch((error) => {
            //If it fails
            console.warn(error);
            res.send(`Error Submitting: ${error.toString()}`);
        });
});

module.exports = router;