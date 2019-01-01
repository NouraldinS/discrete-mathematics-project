import Relation from './Relation';

export default class RSTRelation extends Relation {
	constructor (set) {
		super();
		this.setDomain(set);
		this.setCodomain(set);
	}

  isReflexive = () => Object.keys(this.domain)
  	.every((key) => {
  		const domainEl = parseInt(key);
  		const codomainEl = this.domain[key];
  		return codomainEl.includes(domainEl);
  	});

  isSymmetric = () => Object.keys(this.domain)
  		.every((key) => {
  			const domainEl = parseInt(key);
  			const codomainEls = this.domain[key];
  			return codomainEls.every((el) => !!this.domain[el] && this.domain[el].includes(domainEl));
  		});

  isTransitive = () => Object.keys(this.domain)
  	.every((key) => {
  		const domainEl = parseInt(key);
  		const codomainEls = this.domain[domainEl];
  		if (!codomainEls) return true;
  		// If there exists A to B transition
  		return codomainEls
    		// For all A to B transitions
  			.every((codomainEl) => {
  				// If exists some B to C transition
  				if (this.domain[codomainEl]) {
  					// Then a transition from A to C must exist
  					return this.domain[codomainEl].every((tr) => codomainEls.includes(tr));
  				} else {
  					return true;
  				}
  			}, true);
  	}, true)
}
