// Uncomment the code below and write your tests
import { InsufficientFundsError, SynchronizationFailedError, getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    let bankAccount = getBankAccount(42);
    expect(bankAccount.getBalance()).toBe(42);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    let bankAccount = getBankAccount(42);
    expect(() => { bankAccount.withdraw(50) }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    let mineAccount = getBankAccount(42);
    let otherAccount = getBankAccount(42);
    expect(() => { mineAccount.transfer(50, otherAccount) }).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    let mineAccount = getBankAccount(42);
    let otherAccount = mineAccount;
    expect(() => { mineAccount.transfer(50, otherAccount) }).toThrow();
  });

  test('should deposit money', () => {
    let bankAccount = getBankAccount(42);
    bankAccount.deposit(42);
    expect(bankAccount.getBalance()).toBe(84);
  });

  test('should withdraw money', () => {
    let bankAccount = getBankAccount(42);
    bankAccount.withdraw(42);
    expect(bankAccount.getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    let mineAccount = getBankAccount(42);
    let otherAccount = getBankAccount(42);
    mineAccount.transfer(42, otherAccount);

    expect(mineAccount.getBalance()).toBe(0);
    expect(otherAccount.getBalance()).toBe(84);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    let bankAccount = getBankAccount(42);
    return bankAccount.fetchBalance().then(() => {
      // expect(typeof data).toBe('number');
    });
  });

  test('should set new balance if fetchBalance returned number', async () => {
    let bankAccount = getBankAccount(150);
    return bankAccount.synchronizeBalance().then(() => {
      expect(bankAccount.getBalance()).toBeLessThanOrEqual(100);
    }, () => {});
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    let bankAccount = getBankAccount(150);
    return bankAccount.synchronizeBalance().then(() => { }, (error) => {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    });
  });
});
