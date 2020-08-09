const sharedObject = {
  name: null,
  income: null,
  changeName: function (name) {
    if (name.length === 0) {
      return;
    }
    this.name = name;
    document.querySelector('#name').value = this.name;
  },
  changeIncome: function (income) {
    if (!Number.isInteger(income) || income <= 0) {
      return;
    }
    this.income = income;
    document.querySelector('#income').value = this.income;
  },
  updateName: function () {
    const newName = document.querySelector('#name').value;
    if (newName.length === 0) {
      return;
    }
    this.name = newName;
  },
  updateIncome: function () {
    const newIncome = document.querySelector('#income').value;
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
