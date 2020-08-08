const sharedObject = {
  name: null,
  income: null,
  changeName: function (name) {
    if (name.length === 0) {
      return;
    }
    this.name = name;
    const newName = $('#name');
    newName.val(this.name);
  },
  changeIncome: function (income) {
    if (!Number.isInteger(income) || income <= 0) {
      return;
    }
    this.income = income;
    const newIncome = $('#income');
    newIncome.val(this.income);
  },
  updateName: function () {
    const newName = $('#name').val();
    if (newName.length === 0) {
      return;
    }
    this.name = newName;
  },
  updateIncome: function () {
    const newIncome = $('#income').val();
    if (
      isNaN(newIncome) ||
      !Number.isInteger(Number(newIncome)) ||
      Number(newIncome) <= 0
    ) {
      return;
    }
    this.income = Number(newIncome);
  },
};
module.exports = { sharedObject };
