module.exports = async (req, res) => {
    try {
        res.render("login")
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}