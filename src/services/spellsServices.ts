import apiClient from './apiService';

type Spells = {
	id: string;
	effect: string;
	name: string;
	type: string;
};

export const getSpells = async (): Promise<Spells[]> => {
	const response = await apiClient.get('/spells');
	const spellsTypeWillBeUsed = ['DarkCharm', 'Curse', 'CounterSpell'];

	const filteredResponseData = response.data
		.filter((spell: Spells) => spellsTypeWillBeUsed.includes(spell.type))
		.map((spell: Spells) => ({
			id: spell.id,
			effect: spell.effect,
			name: spell.name,
			type: spell.type,
		}));

	return filteredResponseData;
};
