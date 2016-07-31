'use strict';

// Load modules

const Hoek = require('hoek');
const Xray = require('x-ray');


// Declare internals

const internals = {};


internals.defaults = {
    url: 'http://www.footballlocks.com/nfl_odds.shtml',
    selector: 'table table table table table table table table table table td',
    convert: (results) => {

        const games = [];

        for (let i = 0; i < results.length; i += 6) {
            const result = results[i];

            if (result === 'Date & Time') {
                continue;
            }

            if (result === '') {
                i = results.length;
                continue;
            }

            const game = {
                time: results[i],
                favorite: results[i + 1],
                spread: results[i + 2],
                underdog: results[i + 3],
                total: results[i + 4],
                odds: results[i + 5]
            };

            if (game.spread.indexOf('PK') !== -1) {
                game.spread = 0;
            }

            games.push(game);
        }

        return games;
    }
};


module.exports = internals.Odds = function (options) {

    this.settings = Hoek.applyToDefaults(internals.defaults, options || {});
};


internals.Odds.prototype.get = function (callback) {

    const xray = new Xray();
    const url = this.settings.url;
    const selector = this.settings.selector;

    xray(url, [selector])((err, results) => {

        if (err) {
            return callback(err);
        }

        const odds = this.settings.convert(results);
        return callback(null, odds);
    });
};
