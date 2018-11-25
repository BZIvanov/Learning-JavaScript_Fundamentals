let expect = require("chai").expect;
let SoftUniFy = require("../02.TestTask").SoftUniFy;

describe("Test Softunify class", function() {
    let testCase;
    beforeEach(function() {
        testCase = new SoftUniFy();
    })

    describe("instantiatre correctly", function() {
        it("normal case", function() {
            expect(testCase instanceof SoftUniFy).to.be.true;
            expect(testCase.allSongs).to.be.an('object');
            expect(testCase.allSongs).to.eql({});
        });
    });

    describe("test downloadSong method", function() {
        it("normal case", function() {
            let result = testCase.downloadSong("Eminem", "Hello", "How nice...")
            expect(result instanceof SoftUniFy).to.be.true;
            expect(result.allSongs).to.be.an('object');
            expect(result.allSongs).to.have.own.property('Eminem');
            expect(result.allSongs).to.have.deep.property('Eminem', {rate: 0, votes: 0, songs: ["Hello - How nice..."]});
        });
    });

    describe("test playSong method", function() {
        it("for no songs downloaded", function() {
            expect(testCase.playSong("Hello")).to.equal("You have not downloaded a Hello song yet. Use SoftUniFy's function downloadSong() to change that!"); 
        });
        it("for one songs downloaded", function() {
            let result = testCase.downloadSong("Eminem", "Hello", "Wow...")
            expect(result.playSong("Hello")).to.equal("Eminem:\nHello - Wow...\n"); 
        });
        it("for more than one songs downloaded", function() {
            let result = testCase.downloadSong("Eminem", "Hello", "Wow...");
            result = testCase.downloadSong("Riana", "What", "Now");
            result = testCase.downloadSong("Eminem", "Why", "How");
            expect(result.playSong("Hello")).to.equal("Eminem:\nHello - Wow...\n"); 
        });
    });

    describe("test songsList getter", function() {
        it("for some songs downloaded", function() {
            let result = testCase.downloadSong("Eminem", "Hello", "Wow...");
            result = testCase.downloadSong("Riana", "What", "Now");
            result = testCase.downloadSong("Eminem", "Why", "How");
            expect(result.songsList).to.equal("Hello - Wow...\nWhy - How\nWhat - Now"); 
        });
        it("for some songs downloaded", function() {
            expect(testCase.songsList).to.equal("Your song list is empty"); 
        });
    });

    describe("test rateArtist method", function() {
        it("for some songs downloaded", function() {
            let result = testCase.downloadSong("Eminem", "Hello", "Wow...");
            result = testCase.downloadSong("Riana", "What", "Now");
            result = testCase.downloadSong("Eminem", "Why", "How");
            expect(result.rateArtist("Jovi")).to.equal("The Jovi is not on your artist list."); 
        });
        
    });
});

