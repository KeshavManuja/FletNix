const { ObjectId } = require("mongodb");
const { getMovieModel } = require("../models/movie_model");
const ERROR_MESSAGES = require("../constants/error_constants")
const HomeController = {
    get: async ( req , res) => {
        try {
            const limit = 15;
            let page = req.body.page || 0;
            page = page * limit;
            const title = req.body?.title;
            const type = req.body?.type;
            const filters = {};
            console.log(req.user,"userrrr");
            let loginUserAge = req.user.age;
            if(loginUserAge < 18) {
                filters.rating = {$ne: "R"}
            }
            if(req.body.title) filters.title = title
            if(req.body.type) filters.type = type;
            console.log({filters,page,limit});
            const MovieModel = await getMovieModel();
            const fetchedMovies = await MovieModel.aggregate([
                { "$facet": {
                  "data": [
                    { "$match": filters},
                    { "$skip": page },
                    { "$limit": limit }
                  ],
                  "count": [
                    { "$group": {
                      "_id": null,
                      "count": { "$sum": 1 }
                    }}
                  ]
                }}
              ]).toArray()
            // const fetchedMovies = await MovieModel.find(filters).skip(page).limit(limit).toArray();
            // console.log({res})
            return res.status(200).json({
                data: fetchedMovies[0],
                message:"Fetched successfully!"
            })

        } catch(error) {
            // console.log(error);
            return res.status(504).json({
                message: error.message
            })
        }
    },
    getById: async (req,res) => {
        try {
            let movieId = req.params?.movie_id;
            console.log(movieId);
            if(!movieId) throw new Error(ERROR_MESSAGES.INVALID_DATA)
            // console.log(JSON.stringify(movieId))
            const MovieModel = await getMovieModel();
            const fetchedMovie = await MovieModel.findOne({_id: new ObjectId(movieId)});
            console.log(fetchedMovie)
            return res.status(200).json({
                data: fetchedMovie,
                message:"Fetched successfully!"
            })
        } catch (error) {
            return res.status(504).json({
                message: error.message
            })
        }
    }
}

module.exports = HomeController