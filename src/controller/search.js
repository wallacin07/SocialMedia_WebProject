const getSearch = async (req, res) => {
    const id_user = req.params.id_user;
    console.log(id_user)

    res.render('../views/search', { id_user });
}


module.exports = { getSearch }