import Relation from './Relation';

export default class RelFunction extends Relation {
	getImage = () => this.getRangeOfDefinition();

	getPreimage = () => this.getDomainOfDefinition();

	addElement = (domainEl, codomainEl) => {
		if (this.domain[domainEl] === undefined || this.codomain[codomainEl] === undefined)
			return false;
		if (this.domain[domainEl] && this.domain[domainEl].includes(codomainEl)) return false;

		if (this.domain[domainEl]) return false;
		else this.domain[domainEl] = [codomainEl];


		if (this.codomain[codomainEl]) return false;
		else	this.codomain[codomainEl] = [domainEl];

		return true;
	}

	isSurjective = () => this.isRightTotal() && this.isRightUnique();

	isInjective = () => this.isLeftUnique() && this.isRightUnique();

	isBijective = () => this.isSurjective() && this.isBijective();

	map = (str) => {
		// eslint-disable-next-line no-new-func
		const fun = new Function('x', str);
		this.getDomain().forEach((domainEl) => this.addElement(domainEl, fun(domainEl)));
	}

	composite = (fun) => {
		const compositeFunction = new RelFunction();
		compositeFunction.setDomain(this.getDomain());
		compositeFunction.setCodomain(fun.getCodomain());
		Object.keys(this.domain).forEach((thisKey) => {
			const thisDomainEl = parseInt(thisKey);
			const thisCodomainEl = this.domain[thisKey][0];
			const thatDomainEl = fun.domain[thisCodomainEl][0];
			compositeFunction.addElement(thisDomainEl, thatDomainEl);
		});
		return compositeFunction;
	}
}
