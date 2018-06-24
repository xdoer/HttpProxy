const monk = require("monk");
const url = "127.0.0.1:27017/findip"
const db = monk(url);
const collection = db.get('findip');

class Links {
    constructor(data) {
        this.id = (Date.now()).toString();
        this.data = data;
    }
    save() {
        const obj = {
            id: this.id,
            data: this.data
        }
        return collection.insert(obj)
            .then((docs) => {
                return docs;
            }).catch((err) => {
                return err;
            }).then((result) => {
                db.close()
                return result;
            });
    }
}

Links.get = (obj) => {
    return collection.find(obj).then((docs) => {
        return docs;
    }).catch((err) => {
        return err;
    }).then((result) => {
        //因为每次获取的时候，都伴随着更新
        // db.close();
        return result;
    });
}

Links.update = function(id, data) {
    return collection.update(id, { $set: data }).then(res => {
        return res;
    }).catch((err) => {
        return err;
    }).then((result) => {
        db.close();
        return result;
    })
}

module.exports = Links;