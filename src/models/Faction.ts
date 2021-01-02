import images from '../../assets/images';

export class Faction {
	public name: string;
	public value: number;
	public color: string;
	public image;

	constructor(name: string, value: number, color: string, image?) {
		this.name = name;
		this.value = value;
		this.color = color;
		this.image = image;
	}
}

export const Factions = [
	new Faction('Marquise de Cat', 10, '#FD5200', images.cat),
	new Faction('Underground Duchy', 8, '#D7A872', images.taupe),
	new Faction('Eyrie Dynasties', 7, '#4774B7', images.bird),
	new Faction('Vagabond', 5, '#FCFEFD', images.vagabond),
	new Faction('Riverfolk Company', 5, '#61DDFB', images.otter),
	new Faction('Woodland Alliance', 3, '#59BA53', images.mouse),
	new Faction('Corvid Consipiracy', 3, '#290D7E', images.raven),
	new Faction('Lizard Cult', 2, '#f1f435', images.lizard)
];