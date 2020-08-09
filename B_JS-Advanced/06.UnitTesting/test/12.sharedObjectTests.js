require('jsdom-global')();

// shared object will also have access to the html document, because jsdom-global will make it global for the entire application
const sharedObject = require('../12.sharedObject').sharedObject;
const expect = require('chai').expect;

describe('test cases for sharedObject functionality', function () {
  let testObject;
  beforeEach('init the object', function () {
    testObject = Object.create(sharedObject);
    document.body.innerHTML = `
    <div id="wrapper">
        <input type="text" id="name" />
        <input type="text" id="income" />
    </div>`;
  });

  describe('validate initial state', function () {
    it('should be object', () => {
      expect(testObject).to.an('object');
    });
    it('should return null on testObject.name', () => {
      expect(testObject.name).to.equal(null);
    });
    it('should return null on testObject.income', () => {
      expect(testObject.income).to.equal(null);
    });
    it('should have empty value for the html inputs', () => {
      expect(document.querySelector('#name').value).to.equal('');
      expect(document.querySelector('#income').value).to.equal('');
    });
  });

  describe('test cases for changeName(name) function', function () {
    it('should return null on testObject.name after changeName("")', () => {
      testObject.changeName('');
      expect(testObject.name).to.equal(null);
    });

    it('should return pesho on testObject.name after changeName("pesho")', () => {
      testObject.name = 'pesho';
      testObject.changeName('');
      expect(testObject.name).to.equal('pesho');
    });

    it('should return test on testObject.name after changeName("test")', () => {
      testObject.changeName('test');
      expect(testObject.name).to.equal('test');
      expect(document.querySelector('#name').value).to.equal('test');
    });

    it('should return "5" on testObject.name after changeName(5)', () => {
      testObject.changeName(5);
      expect(testObject.name).to.equal(5);
      expect(document.querySelector('#name').value).to.equal('5');
    });
  });

  describe('test cases for changeIncome(income) function', function () {
    it('should return null on testObject.income after changeIncome("")', () => {
      const prevInput = document.querySelector('#income').value;
      const prevPropValue = testObject.income;
      testObject.changeIncome('');
      expect(testObject.income).to.equal(prevPropValue);
      expect(document.querySelector('#income').value).to.equal(prevInput);
    });

    it('should return null on testObject.income after changeIncome(88)', () => {
      const prevInput = document.querySelector('#income').value;
      testObject.income = 88;
      testObject.changeIncome('');
      expect(testObject.income).to.equal(88);
      expect(document.querySelector('#income').value).to.equal(prevInput);
    });

    it('should return null on testObject.income after changeIncome(0)', () => {
      const prevInput = document.querySelector('#income').value;
      const prevPropValue = testObject.income;
      testObject.changeIncome(0);
      expect(testObject.income).to.equal(prevPropValue);
      expect(document.querySelector('#income').value).to.equal(prevInput);
    });

    it('should return null on testObject.income after changeIncome(-20)', () => {
      const prevInput = document.querySelector('#income').value;
      const prevPropValue = testObject.income;
      testObject.changeIncome(-20);
      expect(testObject.income).to.equal(prevPropValue);
      expect(document.querySelector('#income').value).to.equal(prevInput);
    });

    it('should return null on testObject.income after changeIncome(2.5)', () => {
      const prevInput = document.querySelector('#income').value;
      const prevPropValue = testObject.income;
      testObject.changeIncome(2.5);
      expect(testObject.income).to.equal(prevPropValue);
      expect(document.querySelector('#income').value).to.equal(prevInput);
    });

    it('should return "18" on testObject.income after changeIncome("18")', () => {
      testObject.changeIncome(18);
      expect(testObject.income).to.equal(18);
      expect(document.querySelector('#income').value).to.equal('18');
    });

    it('should return "50" on testObject.income after {1,-5,50})', () => {
      testObject.changeIncome(1);
      testObject.changeIncome(-5);
      testObject.changeIncome(50);
      expect(testObject.income).to.equal(50);
      expect(document.querySelector('#income').value).to.equal('50');
    });
  });

  describe('test cases for updateName(name) function', function () {
    it('should not change anything on updateName()', () => {
      testObject.updateName('pesho');
      expect(document.querySelector('#name').value).to.equal('');
      expect(testObject.name).to.equal(null);
    });

    it('should not change anything on updateName() and change object name', () => {
      testObject.name = 'kiro';
      testObject.updateName('pesho');
      expect(document.querySelector('#name').value).to.equal('');
      expect(testObject.name).to.equal('kiro');
    });

    it('should update testObject.name on updateName()', () => {
      const nameInput = document.querySelector('#name');
      nameInput.value = 'pesho';
      testObject.updateName();
      expect(testObject.name).to.equal('pesho');
      expect(nameInput.value).to.equal('pesho');
    });
  });

  describe('test cases for updateIncome() function', function () {
    it('should not change anything on updateIncome()', () => {
      const incomeInput = document.querySelector('#income');
      incomeInput.value = 2.5;
      testObject.updateIncome();
      expect(incomeInput.value).to.equal('2.5');
      expect(testObject.income).to.equal(null);
    });

    it('should not change anything on updateIncome() with previously set obj.income', () => {
      testObject.income = 65;
      const incomeInput = document.querySelector('#income');
      incomeInput.value = -30;
      testObject.updateIncome();
      expect(incomeInput.value).to.equal('-30');
      expect(testObject.income).to.equal(65);
    });

    it('should not change anything on updateIncome() with previously set obj.income and input value of 0', () => {
      testObject.income = 65;
      const incomeInput = document.querySelector('#income');
      incomeInput.value = 0;
      testObject.updateIncome();
      expect(incomeInput.value).to.equal('0');
      expect(testObject.income).to.equal(65);
    });

    it('should change income on updateIncome() {50}', () => {
      const incomeInput = document.querySelector('#income');
      incomeInput.value = 50;
      testObject.updateIncome();
      expect(incomeInput.value).to.equal('50');
      expect(testObject.income).to.equal(50);
    });
  });
});
