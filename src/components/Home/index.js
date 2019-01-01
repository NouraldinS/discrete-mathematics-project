import React from 'react';

import Relation from '../../Logic/Relation';
import RSTRelation from '../../Logic/RSTRelation';
import RelFunction from '../../Logic/RelFunction';

import './index.less';

const Home = (props) => {
	// const R = new Relation(1, 5);
	// R.setDomain(1, 5);
	// R.setCodomain(6, 10);
	// R.addElement(1, 6);
	// R.addElement(1, 8);
	// R.addElement(2, 7);
	// R.addElement(3, 8);
	// R.addElement(1, 6);
	//
	// console.log('R', R);
	// console.log('R.getPosition(1,6', R.getPosition(1, 6));
	// console.log('R.getPosition(1,5', R.getPosition(1, 5));
	// console.log('R.getDomainOfDefinition()', R.getDomainOfDefinition());
	// console.log('R.getRangeOfDefinition()', R.getRangeOfDefinition());
	// console.log('R.getDomain()', R.getDomain());
	// console.log('R.getConnectionMap()', R.getConnectionMap());

	// const F = new RelFunction();
	// F.setDomain(1, 5);
	// F.setCodomain(6, 10);
	// console.log(F.addElement(1, 6));
	// console.log(F.addElement(1, 6));
	// console.log(F.addElement(1, 8));
	// console.log(F.addElement(2, 7));
	// console.log(F.addElement(3, 8));
	// console.log('F', F);
	// console.log('F.getPosition(1,6', F.getPosition(1, 6));
	// console.log('F.getPosition(1,5', F.getPosition(1, 5));
	// console.log('F.getDomainOfDefinition()', F.getDomainOfDefinition());
	// console.log('F.getFangeOfDefinition()', F.getRangeOfDefinition());
	// console.log('F.getDomain()', F.getDomain());
	// console.log('F.getConnectionMap()', F.getConnectionMap());
	// console.log('F.isLeftTotal()', F.isLeftTotal());
	// console.log(F.addElement(4, 9));
	// console.log(F.addElement(5, 10));
	// console.log(F.addElement(3, 10));
	// console.log('F.isLeftTotal()', F.isLeftUnique());
	// console.log('F.isLeftTotal()', F.isRightTotal());
	// console.log('F.isRightUnique()', F.isRightUnique());
	// F.map('return x+6');
	// console.log('F', F);

	// const F1 = new RelFunction();
	// F1.setDomain(1, 5);
	// F1.setCodomain(6, 10);
	// F1.map('return x + 5;');
	//
	// const F2 = new RelFunction();
	// F2.setDomain(6, 10);
	// F2.setCodomain(11, 20);
	// F2.map('return x + 5;');
	//
	// const F3 = F1.composite(F2);
	//
	// console.log('F3', F3);

	const rs = new RSTRelation([1, 2, 3, 4, 5, 6]);
	rs.addElement(1, 2);
	rs.addElement(2, 3);
	rs.addElement(1, 3);
	console.log('rs.isTransitive()', rs.isTransitive());
	return (
		<div className='home'>
			<div>Discrete mathematics</div>
			<div>Relations and Functions</div>
		</div>
	);
};

export default Home;
