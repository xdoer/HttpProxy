const fetchLinks = require("./fetchLinks");
const Links = require("../model/Links");

async function toupdate(db_get_result) {
    const result = await fetchLinks();
    if (db_get_result.length < 1) {
        const link = new Links(result);
        return link.save();
    } else {
        return Links.update({ id: db_get_result[0].id }, { data: result });
    }
}

module.exports = toupdate;