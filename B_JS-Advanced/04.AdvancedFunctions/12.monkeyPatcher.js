function votingSystem(action) {
  const that = this;

  const patcher = (function () {
    function upvote() {
      that.upvotes++;
    }

    function downvote() {
      that.downvotes++;
    }

    function fakeRecords(num) {
      return 0.25 * num;
    }

    function calculateRating() {
      const totalVotes = that.upvotes + that.downvotes;
      if (totalVotes >= 10) {
        if (that.upvotes / totalVotes > 0.66) {
          return 'hot';
        } else if (
          that.upvotes - that.downvotes >= 0 &&
          (that.upvotes > 100 || that.downvotes > 100)
        ) {
          return 'controversial';
        } else if (that.upvotes - that.downvotes < 0) {
          return 'unpopular';
        }
        return 'new';
      }
      return 'new';
    }

    function score() {
      let up = that.upvotes;
      let down = that.downvotes;

      let totalScore = that.upvotes - that.downvotes;
      if (that.upvotes + that.downvotes > 50) {
        const additionalVotes = fakeRecords(
          Math.max(that.upvotes, that.downvotes)
        );
        up = Math.ceil(that.upvotes + additionalVotes);
        down = Math.ceil(that.downvotes + additionalVotes);
      }

      const rating = calculateRating();
      return [up, down, totalScore, rating];
    }
    return { upvote, downvote, score };
  })();

  return patcher[action]();
}

const obj = {
  id: '1',
  author: 'pesho',
  content: 'hi guys',
  upvotes: 101,
  downvotes: 99,
};
console.log(votingSystem.call(obj, 'score')); // [127, 125, 2, 'controversial']
