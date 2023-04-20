exports.getUserModel =  async ()=> {
    let user_model = await db_connection.collection("users");
    return user_model;
}