import { onlyUnique, typeOf } from '../helpers';

export default class Relation {
	constructor (_domain, _codomain) {
		this.domain = _domain ? _domain : {};
		this.codomain = _codomain ? _codomain : {};
	}

	setDomain = (newDomain, newDomainEnd) => {
		if (newDomainEnd && typeOf(newDomainEnd) === 'Number' && typeOf(newDomain) === 'Number') {
			const domain = {};
			if (newDomain < newDomainEnd)
				for (let i = newDomain; i <= newDomainEnd; i++) domain[i] = null;
			else
				for (let i = newDomain; i >= newDomainEnd; i--) domain[i] = null;
			this.domain = domain;
		} else if (typeOf(newDomain) === 'Array') {
			this.domain = newDomain.reduce((accu, curr) => ({ ...accu, [curr]: null }), {});
		} else if (typeOf(newDomain) === 'Object') {
			this.domain = newDomain;
		} else {
			throw new TypeError(`setDomain parameters are wrong
				Usage:
				setDomain(Number, Number)
				setDomain(Object)
				setDomain(Array)
				But supplied setDomain(${typeOf(newDomain)}, ${typeOf(newDomainEnd)})
				newDomain: ${newDomain}
				newDomainEnd: ${newDomainEnd}`);
		}
	};

	setCodomain = (newCodomain, newCodomainEnd) => {
		if (newCodomainEnd && typeOf(newCodomainEnd) === 'Number' && typeOf(newCodomain) === 'Number') {
			const codomain = {};
			if (newCodomain < newCodomainEnd)
				for (let i = newCodomain; i <= newCodomainEnd; i++) codomain[i] = null;
			else
				for (let i = newCodomain; i >= newCodomainEnd; i--) codomain[i] = null;
			this.codomain = codomain;
		} else if (typeOf(newCodomain) === 'Array') {
			this.codomain = newCodomain.reduce((accu, curr) => ({ ...accu, [curr]: null }), {});
		} else if (typeOf(newCodomain) === 'Object') {
			this.codomain = newCodomain;
		} else {
			throw new TypeError(`setCodomain parameters are wrong
				Usage:
				setCodomain(Number, Number)
				setCodomain(Object)
				setCodomain(Array)
				But supplied setDomain(${typeOf(newCodomain)}, ${typeOf(newCodomainEnd)})
				newDomain: ${newCodomain}
				newDomainEnd: ${newCodomainEnd}`);
		}
	};

	getDomain = () => Object.keys(this.domain).map((el) => parseInt(el));

	getCodomain = () => Object.keys(this.codomain).map((el) => parseInt(el));

	getAreaOfDefinition = (area) => Object.values(this[area])
		.filter((el) => el || el === 0)
		.reduce((accum, curr) => [...accum, ...curr], [])
		.filter(onlyUnique)

	getDomainOfDefinition = () => this.getAreaOfDefinition('codomain');

	getRangeOfDefinition = () => this.getAreaOfDefinition('domain');

	addElement = (domainEl, codomainEl) => {
		if (this.domain[domainEl] === undefined || this.codomain[codomainEl] === undefined)
			return false;
		if (this.domain[domainEl]) {
			if (this.domain[domainEl].includes(codomainEl)) return false;
			else this.domain[domainEl].push(codomainEl);
		} else {
			this.domain[domainEl] = [codomainEl];
		}

		if (this.codomain[codomainEl]) {
			if (this.codomain[codomainEl].includes(domainEl)) return false;
			else this.codomain[codomainEl].push(domainEl);
		} else {
			this.codomain[codomainEl] = [domainEl];
		}
		return true;
	}

	getPosition = (domainEl, codomainEl = domainEl) => this.domain[domainEl] &&
		this.domain[domainEl].includes(codomainEl);

	getConnectionMap = () => {
		let map = `\n  ${this.getDomain().map((num) => `${num}`.padStart(3, ' ')).join('') }\n`;
		this.getCodomain().forEach((codomainEl) => {
			map += `${codomainEl}`.padEnd(3, ' ');
			this.getDomain().forEach((domainEl) => {
				map += ` ${ Number(this.getPosition(domainEl, codomainEl))} `;
			});
			map += '\n';
		});
		return map;
	}

	toString = () => `Domain: ${this.getDomain()}\n` +
									 `Domain of definition: ${this.getDomainOfDefinition()}\n` +
									 `Codomain: ${this.getCodomain()}\n` +
									 `Range of definition: ${this.getRangeOfDefinition()}\n` +
									 'Connections:\n' +
									 `${this.getDomainOfDefinition()
										 .map((key) => this.domain[key]
											 .map((el) => `	${key} => ${el}`)
											 .join('\n'))
										 .join('\n')}`

  isLeftTotal = () => this.getDomainOfDefinition().length === this.getDomain().length

	isRightTotal = () => this.getRangeOfDefinition().length === this.getCodomain().length

	isLeftUnique = () => Object.keys(this.domain).every((key) => {
		const domainElementExists = Boolean(this.domain[key]);
		const domainElemnetHasAtMost1Element = domainElementExists && this.domain[key].length === 1;
		return domainElemnetHasAtMost1Element;
	})

	isRightUnique = () => Object.keys(this.codomain).every((key) => {
		const codomainElementExists = Boolean(this.codomain[key]);
		const codomainElemnetHasAtMost1Element = codomainElementExists
			&& this.codomain[key].length === 1;
		return codomainElemnetHasAtMost1Element;
	})
}
