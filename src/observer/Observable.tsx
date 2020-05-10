import { Observer } from './Observer';

export interface IObservable {
	getValue<T extends keyof this>(key: T): this[T];
	setValue<T extends keyof this>(
		key: T,
		value: this[T],
		allowEqualValues?: boolean
	): void;
	addObserver<T extends keyof this>(
		callback: (value: this[T], key: T) => void,
		key?: T,
		initialize?: boolean,
		value?: this[T]
	): Function;
	removeObservers<T extends keyof this>(
		callback: (value: this[T], key: T) => void,
		key?: T,
		value?: this[T]
	): void;
}

export class Observable implements IObservable {
	static readonly instance = new Observable();

	readonly observers: Observer<any, any>[] = [];

	public getValue<T extends keyof this>(key: T): this[T] {
		return this[key];
	}

	public setValue<T extends keyof this>(
		key: T,
		value: this[T],
		allowEqualValues = false
	): void {
		if (!allowEqualValues && this[key] === value) return;

		this[key] = value;

		this.callObserversFrom<T>(this.observers, key, value);
	}

	public addObserver<T extends keyof this>(
		callback: (value: this[T], key: T) => void,
		key?: T,
		initialize = false,
		value?: this[T]
	): Function {
		return this.addObserverTo(
			this.observers,
			callback,
			key,
			initialize,
			value
		);
	}

	public removeObservers<T extends keyof this>(
		callback: (value: this[T], key: T) => void,
		key?: T,
		value?: this[T]
	): void {
		this.removeObserversFrom(this.observers, callback, key, value);
	}

	addObserverTo<T extends keyof this>(
		observers: Observer<T, this[T]>[],
		callback: (value: this[T], key: T) => void,
		key?: T,
		initialize = false,
		value?: this[T]
	): Function {
		const observer = new Observer(callback, key, value);

		if (callback) observers.push(observer);

		if (initialize) this.callObserver(observer, key, this[key]);

		return () => this.removeObserversFrom(observers, callback, key, value);
	}

	removeObserversFrom<T extends keyof this>(
		observers: Observer<T, this[T]>[],
		callback: (value: this[T], key: T) => void,
		key?: T,
		value?: this[T]
	): void {
		for (let i = observers.length - 1; i >= 0; i--) {
			const observer = observers[i];
			if (callback !== observer.callback) {
				continue;
			} else if (key && key !== observer.key) {
				continue;
			} else if (value && value !== observer.value) {
				continue;
			}
			observers.splice(i, 1);
		}
	}

	callObserversFrom<T extends keyof this>(
		observers: Observer<T, this[T]>[],
		key: T,
		value: this[T]
	): void {
		for (let i = observers.length - 1; i >= 0; i--) {
			this.callObserver(observers[i], key, value);
		}
	}

	callObserver<T extends keyof this>(
		observer: Observer<T, this[T]>,
		key: T,
		value: this[T]
	): void {
		if (observer.key && observer.key !== key) {
			return;
		} else if (observer.hasExpectedValue && observer.value !== value) {
			return;
		}
		observer.callback(value, key);
	}
}
