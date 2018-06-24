const Links = require("../model/Links");
const schedule = require("node-schedule");
const auto = require("./toupdate");

module.exports = function() {
    const rule2 = new schedule.RecurrenceRule();
    const times2 = [1, 21, 41];
    rule2.minute = times2;
    schedule.scheduleJob(rule2, function() {
        const result = Links.get({});
        auto();
    });
};