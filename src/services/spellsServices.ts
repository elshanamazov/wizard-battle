import apiClient from './apiService';

export type SpellsResponseType = {
	id: string;
	effect: string;
	name: string;
	type: string;
	incantation: string;
};

export const getSpells = async (): Promise<SpellsResponseType[]> => {
	const response = await apiClient.get('/spells');
	const spellsTypeWillBeUsed = ['Curse', 'CounterSpell'];

	const filteredResponseData = response.data
		.filter((spell: SpellsResponseType) => spellsTypeWillBeUsed.includes(spell.type))
		.map((spell: SpellsResponseType) => ({
			id: spell.id,
			effect: spell.effect,
			name: spell.name,
			type: spell.type,
			incantation: spell.incantation,
		}));

	return filteredResponseData;
};
