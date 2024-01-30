export const saveToStorage = <T>(key: string, data: T) => {
	try {
		const dataStore = JSON.stringify(data);
		localStorage.setItem(key, dataStore);
	} catch (error) {
		console.error("Error saving to localStorage", error);
	}
};

export const loadFromStorage = <T>(key: string): T | null => {
	try {
		const dataStore = localStorage.getItem(key);
		if (dataStore) {
			return JSON.parse(dataStore) as T;
		}
	} catch (error) {
		console.error("Error loading from localStorage", error);
	}

	return null;
};
