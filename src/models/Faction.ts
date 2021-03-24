import images from '../../assets/images';

export class Faction {
	public name: string;
	public value: number;
	public color: string;
	public image;
	public available;

	constructor(name: string, value: number, color: string, image?, available = true) {
		this.name = name;
		this.value = value;
		this.color = color;
		this.image = image;
		this.available = available;
	}
}

export const Factions = [
	new Faction('Marquise de Cat', 10, '#FD5200', images.cat),
	new Faction('Underground Duchy', 8, '#D7A872', images.taupe),
	new Faction('Keepers in Iron', 8, '#CBCBCD', images.badger, false),
	new Faction('Lord of The Hundreds', 8, '#C50730', images.rat, false),
	new Faction('Eyrie Dynasties', 7, '#4774B7', images.bird),
	new Faction('Vagabond', 5, '#FCFEFD', images.vagabond),
	new Faction('Riverfolk Company', 5, '#61DDFB', images.otter),
	new Faction('Woodland Alliance', 3, '#59BA53', images.mouse),
	new Faction('Corvid Consipiracy', 3, '#290D7E', images.raven),
	new Faction('Lizard Cult', 2, '#f1f435', images.lizard)
];

export const GetViableGameSum = (playerCount:number) => {
	switch (playerCount) {
		case 2:
			return 17;
		case 3:
			return 18;
		case 4:
			return 21;
		case 5:
			return 25;
		case 6:
			return 28;
		default:
			return 0;
	}
}

export const GetBigFactionsSum = (factions:Faction[], playerCount:number) => {
	let sum = 0;
	factions.sort((a, b) => a.value > b.value ? -1 : 1)
	for (let i = 0; i < playerCount; i++) {
		sum += factions[i].value;
	}
	return sum;
}