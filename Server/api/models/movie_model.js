exports.getMovieModel =  async ()=> {
    let movie_model = await db_connection.collection("movies");
    return movie_model;
}