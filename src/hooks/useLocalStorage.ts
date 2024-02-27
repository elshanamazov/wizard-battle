import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error('Error reading from localStorage', error);
			return initialValue;
		}
	});

	useEffect((): void => {
		try {
			const dataStore = JSON.stringify(storedValue);
			localStorage.setItem(key, dataStore);
		} catch (error) {
			console.error('Error saving to localStorage', error);
		}
	}, [key, storedValue]);

	return [storedValue, setStoredValue];
};

export default useLocalStorage;
