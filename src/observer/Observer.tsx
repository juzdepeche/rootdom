export class Observer<T, K> {
	value:K;
	hasExpectedValue = false;

	constructor(public callback:(value:K, key:T) => void, public key?:T, value:K | 'no expected value' = 'no expected value') {
		if (value !== 'no expected value') {
			this.value = value;
			this.hasExpectedValue = true;
		}
	}
}