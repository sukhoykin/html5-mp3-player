
A = function() {
	debug('A');
	a = 'A.a';
	this.b = 'A.b';
};
A.prototype = {
	c: 'A.c',
	getA: function() {
		return a;
	},
	getB: function() {
		return this.b;
	},
	getC: function() {
		return this.c;
	}
};


B = function() {
	debug('B');
};
B.prototype = new A;
B.prototype.getA = function() {
	return 'a: ' + a;
};
B.prototype.d = 'B.d';

C = function() {
	debug('C()');
};

C.prototype = {
	a: 'C.a',
	get: function() {
		return this.a;
	}
};

function test() {
	
	debug('###1');
	a1 = new A();
	debug(a1.a);
	debug(a1.b);
	debug(a1.c);
	debug(a1.getA());
	
	debug('###2');
	a1.b='A.b.1';
	a1.c='A.c.1';
	debug(a1.b);
	debug(a1.c);
	
	debug('###3');
	a2 = new A();
	debug(a2.a);
	debug(a2.b);
	debug(a2.c);
	
	debug('###4');
	b1 = new B();
	debug(b1.a);
	debug(b1.b);
	debug(b1.c);
	debug(b1.getA());
	debug(b1.d);
	
	debug('###5');
	c1 = new C(); 
	debug(c1.a);
	debug(c1.get());
}

function debug(str)
{
	$('#fm-debug').append(str + '<br />');
}