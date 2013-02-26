function Grid(w, h, wrap) {
	this.dat = [];
	this.count = [];
	this.w = w;
	this.h = h;
	for(var i=0; i<w*h; i+=1) { this.dat.push(false); this.count.push(0); }
	this.wrap = Boolean(wrap);
}
Grid.prototype.get = function(x,y) {
	if (this.wrap)	{
		if (x < 0) x += this.w;
		if (y < 0) y += this.h;
		x %= this.w;
		y %= this.h;
	}
	if (x < 0 || y < 0 || x >= this.w || y >= this.h) return false;
	return this.dat[x+y*this.w];
}
Grid.prototype.getCount = function(x,y) {
	if (this.wrap)	{
		if (x < 0) x += this.w;
		if (y < 0) y += this.h;
		x %= this.w;
		y %= this.h;
	}
	if (x < 0 || y < 0 || x >= this.w || y >= this.h) return 0;
	return this.count[x+y*this.w];
}
Grid.prototype._setCount = function(x,y, value) {
	if (this.wrap)	{
		if (x < 0) x += this.w;
		if (y < 0) y += this.h;
		x %= this.w;
		y %= this.h;
	}
	if (x < 0 || y < 0 || x >= this.w || y >= this.h) return false;
	this.count[x+y*this.w] = value;
	return true;
}
Grid.prototype._changeCount = function(x,y, offset) {
	if (this.wrap)	{
		if (x < 0) x += this.w;
		if (y < 0) y += this.h;
		x %= this.w;
		y %= this.h;
	}
	if (x < 0 || y < 0 || x >= this.w || y >= this.h) return false;
	this.count[x+y*this.w] += offset;
	return true;
}
Grid.prototype.set = function(x,y, value) {
	if (this.wrap)	{
		if (x < 0) x += this.w;
		if (y < 0) y += this.h;
		x %= this.w;
		y %= this.h;
	}
	if (x < 0 || y < 0 || x >= this.w || y >= this.h) return false;
	var offset = (value?1:0) - (this.get(x,y)?1:0);
	this.dat[x+y*this.w] = value;
	for (var nx=x-1; nx<=x+1; nx+=1) {
		for (var ny=y-1; ny<=y+1; ny+=1) {
			if (nx != x || ny != y) this._changeCount(nx,ny,offset);
		}
	}
	return true;
}
Grid.prototype.toggle = function(x,y) { this.set(x,y,!this.get(x,y)); }
Grid.prototype.generation = function() {
	for(var i=0; i<this.w*this.h; i+=1) {
		this.dat[i] = this.count[i] == 3 || (this.count[i] == 2 && this.dat[i]);
		this.count[i] = 0;
	}
	for(var x=0; x<this.w; x+=1) {
		for (var y=0; y<this.h; y+=1) {
			if (this.dat[x+y*this.w]) {
				for (var nx=x-1; nx<=x+1; nx+=1) {
					for (var ny=y-1; ny<=y+1; ny+=1) {
						if (nx != x || ny != y) this._changeCount(nx,ny,1);
					}
				}
			}
		}
	}
}

