const express = require("express");
const Game = require("../model/games");
const User = require("../model/schema");

const router = express();


router.post("/add-games", async (req, res) => {
    const { userID, gameDetails } = req.body;

    if (!userID || !gameDetails) {
        return res.status(422).json({
            status: 422,
            error: "Please fill all the fields",
        });
    }

    try {
        const newGame = new Game({
            userID,
            gameDetails,
        });

        const resData = await newGame.save();

        res.status(201).json({
            status: 200,
            message: "Game successfully added",
            data: resData,
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/get-games", async (req, res) => {
    try {
        const games = await Game.find({});
        res.status(200).json({
            status: 200,
            message: "Games successfully fetched",
            data: games,
        });
    } catch (error) {
        console.log(error);
    }
});


router.get("/get-games/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        // const games = await Game.find({ userID: userId }).sort({ createdAt: 1 })
        
        // Find game by user id and show the latest game first
        const games = await Game.find({ userID: userId }).sort({ createdAt: -1 })

        res.status(200).json({
            status: 200,
            message: "Games successfully fetched",
            data: games?.reverse(),
        });
    } catch (error) {
        console.log(error);
    }
});


router.put("/update-games/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { userID, gameDetails } = req.body;


        const newGame =  await Game.findByIdAndUpdate(id, {
            userID,
            gameDetails,
        });

        res.status(200).json({
            status: 200,
            message: "Game successfully updated",
            data: newGame,
        });
    } catch (error) {
        console.log(error);
    }
});

router.put("/update-score-board/:userId", async (req, res) => {
    try {
        const id = req.params.userId;
        const {score} =  req.body;

        if(!score)
            res.status(422).json({
                error: "Score is required",
            });
        // Update totalScore in user schema by adding score

        await User.findByIdAndUpdate(id, {
            $inc: { totalScore: score },
        });
        

        res.status(200).json({
            status: 200,
            message: "Game successfully updated",
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/get-score-board", async (req, res) => {
    try {
        const users = await User.find({}).sort({ totalScore: -1 });

        res.status(200).json({
            status: 200,
            message: "Users successfully fetched",
            data: users,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            status: 500,
            message: "Something went wrong",
        });


    }
});








module.exports = router;



