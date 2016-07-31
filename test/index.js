'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const NFLOdds = require('../');

// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('NFL Odds', () => {

    it('loads without options', (done) => {

        const throws = () => {

            new NFLOdds();
        };

        expect(throws).not.to.throw();
        done();
    });

    it('loads with options', (done) => {

        const throws = () => {

            new NFLOdds({ url: 'http://foo.bar' });
        };

        expect(throws).not.to.throw();
        done();
    });

    it('gets odds', (done) => {

        const nflodds = new NFLOdds();
        nflodds.get((err, result) => {

            expect(err).to.not.exist();
            expect(result).to.exist();
            expect(result.length).to.be.above(0);
            done();
        });
    });
});
