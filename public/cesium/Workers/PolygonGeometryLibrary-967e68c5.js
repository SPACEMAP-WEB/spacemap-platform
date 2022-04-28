define(["exports","./ArcType-98ec98bf","./arrayRemoveDuplicates-707c233c","./Cartesian2-08065eec","./ComponentDatatype-a867ddaa","./when-ad3237a0","./EllipsoidRhumbLine-4a6ed5de","./GeometryAttribute-da891979","./GeometryAttributes-27dc652d","./GeometryPipeline-3334f964","./IndexDatatype-9504f550","./Math-5ca9b250","./Transforms-1142ce48","./PolygonPipeline-ac773b7c"],(function(e,t,r,i,n,a,o,s,u,l,h,c,f,p){"use strict";function d(){this._array=[],this._offset=0,this._length=0}Object.defineProperties(d.prototype,{length:{get:function(){return this._length}}}),d.prototype.enqueue=function(e){this._array.push(e),this._length++},d.prototype.dequeue=function(){if(0!==this._length){var e=this._array,t=this._offset,r=e[t];return e[t]=void 0,10<++t&&2*t>e.length&&(this._array=e.slice(t),t=0),this._offset=t,this._length--,r}},d.prototype.peek=function(){if(0!==this._length)return this._array[this._offset]},d.prototype.contains=function(e){return-1!==this._array.indexOf(e)},d.prototype.clear=function(){this._array.length=this._offset=this._length=0},d.prototype.sort=function(e){0<this._offset&&(this._array=this._array.slice(this._offset),this._offset=0),this._array.sort(e)};var y={computeHierarchyPackedLength:function(e){for(var t=0,r=[e];0<r.length;){var n=r.pop();if(a.defined(n)){t+=2;var o=n.positions,s=n.holes;if(a.defined(o)&&(t+=o.length*i.Cartesian3.packedLength),a.defined(s))for(var u=s.length,l=0;l<u;++l)r.push(s[l])}}return t},packPolygonHierarchy:function(e,t,r){for(var n=[e];0<n.length;){var o=n.pop();if(a.defined(o)){var s=o.positions,u=o.holes;if(t[r++]=a.defined(s)?s.length:0,t[r++]=a.defined(u)?u.length:0,a.defined(s))for(var l=s.length,h=0;h<l;++h,r+=3)i.Cartesian3.pack(s[h],t,r);if(a.defined(u))for(var c=u.length,f=0;f<c;++f)n.push(u[f])}}return r},unpackPolygonHierarchy:function(e,t){for(var r=e[t++],n=e[t++],a=new Array(r),o=0<n?new Array(n):void 0,s=0;s<r;++s,t+=i.Cartesian3.packedLength)a[s]=i.Cartesian3.unpack(e,t);for(var u=0;u<n;++u)o[u]=y.unpackPolygonHierarchy(e,t),t=o[u].startingIndex,delete o[u].startingIndex;return{positions:a,holes:o,startingIndex:t}}},g=new i.Cartesian3;y.subdivideLineCount=function(e,t,r){return t=i.Cartesian3.distance(e,t),r=Math.max(0,Math.ceil(c.CesiumMath.log2(t/r))),Math.pow(2,r)};var m=new i.Cartographic,v=new i.Cartographic,C=new i.Cartographic,b=new i.Cartesian3;y.subdivideRhumbLineCount=function(e,t,r,i){return t=e.cartesianToCartographic(t,m),r=e.cartesianToCartographic(r,v),i=new o.EllipsoidRhumbLine(t,r,e).surfaceDistance/i,i=Math.max(0,Math.ceil(c.CesiumMath.log2(i))),Math.pow(2,i)},y.subdivideLine=function(e,t,r,n){var o=y.subdivideLineCount(e,t,r),s=i.Cartesian3.distance(e,t),u=s/o,l=n=a.defined(n)?n:[];l.length=3*o;for(var h,c,f=0,p=0;p<o;p++){var d=(d=e,h=p*u,c=s,i.Cartesian3.subtract(t,d,g),i.Cartesian3.multiplyByScalar(g,h/c,g),i.Cartesian3.add(d,g,g),[g.x,g.y,g.z]);l[f++]=d[0],l[f++]=d[1],l[f++]=d[2]}return l},y.subdivideRhumbLine=function(e,t,r,i,n){t=e.cartesianToCartographic(t,m),r=e.cartesianToCartographic(r,v);var s=new o.EllipsoidRhumbLine(t,r,e),u=(i=s.surfaceDistance/i,i=Math.max(0,Math.ceil(c.CesiumMath.log2(i))),Math.pow(2,i)),l=s.surfaceDistance/u,h=n=a.defined(n)?n:[];h.length=3*u;for(var f=0,p=0;p<u;p++){var d=s.interpolateUsingSurfaceDistance(p*l,C);d=e.cartographicToCartesian(d,b);h[f++]=d.x,h[f++]=d.y,h[f++]=d.z}return h};var w=new i.Cartesian3,T=new i.Cartesian3,I=new i.Cartesian3,x=new i.Cartesian3;y.scaleToGeodeticHeightExtruded=function(e,t,r,n,o){n=a.defaultValue(n,i.Ellipsoid.WGS84);var s=w,u=T,l=I,h=x;if(a.defined(e)&&a.defined(e.attributes)&&a.defined(e.attributes.position))for(var c=e.attributes.position.values,f=c.length/2,p=0;p<f;p+=3)i.Cartesian3.fromArray(c,p,l),n.geodeticSurfaceNormal(l,s),h=n.scaleToGeodeticSurface(l,h),u=i.Cartesian3.multiplyByScalar(s,r,u),u=i.Cartesian3.add(h,u,u),c[p+f]=u.x,c[p+1+f]=u.y,c[p+2+f]=u.z,o&&(h=i.Cartesian3.clone(l,h)),u=i.Cartesian3.multiplyByScalar(s,t,u),u=i.Cartesian3.add(h,u,u),c[p]=u.x,c[p+1]=u.y,c[p+2]=u.z;return e},y.polygonOutlinesFromHierarchy=function(e,t,n){var o,s,u=[],l=new d;for(l.enqueue(e);0!==l.length;){var h=l.dequeue(),c=h.positions;if(t)for(s=c.length,p=0;p<s;p++)n.scaleToGeodeticSurface(c[p],c[p]);if(!((c=r.arrayRemoveDuplicates(c,i.Cartesian3.equalsEpsilon,!0)).length<3)){for(var f=h.holes?h.holes.length:0,p=0;p<f;p++){var y=h.holes[p],g=y.positions;if(t)for(s=g.length,o=0;o<s;++o)n.scaleToGeodeticSurface(g[o],g[o]);if(!((g=r.arrayRemoveDuplicates(g,i.Cartesian3.equalsEpsilon,!0)).length<3)){u.push(g);var m=0;for(a.defined(y.holes)&&(m=y.holes.length),o=0;o<m;o++)l.enqueue(y.holes[o])}}u.push(c)}}return u},y.polygonsFromHierarchy=function(e,t,n,o){var s=[],u=[],l=new d;for(l.enqueue(e);0!==l.length;){var h,c=l.dequeue(),f=c.positions,y=c.holes;if(n)for(h=f.length,T=0;T<h;T++)o.scaleToGeodeticSurface(f[T],f[T]);if(!((f=r.arrayRemoveDuplicates(f,i.Cartesian3.equalsEpsilon,!0)).length<3)){var g=t(f);if(a.defined(g)){var m=[];p.PolygonPipeline.computeWindingOrder2D(g)===p.WindingOrder.CLOCKWISE&&(g.reverse(),f=f.slice().reverse());for(var v,C=f.slice(),b=a.defined(y)?y.length:0,w=[],T=0;T<b;T++){var I=y[T],x=I.positions;if(n)for(h=x.length,v=0;v<h;++v)o.scaleToGeodeticSurface(x[v],x[v]);if(!((x=r.arrayRemoveDuplicates(x,i.Cartesian3.equalsEpsilon,!0)).length<3)){var E=t(x);if(a.defined(E)){p.PolygonPipeline.computeWindingOrder2D(E)===p.WindingOrder.CLOCKWISE&&(E.reverse(),x=x.slice().reverse()),w.push(x),m.push(C.length);C=C.concat(x),g=g.concat(E);var A=0;for(a.defined(I.holes)&&(A=I.holes.length),v=0;v<A;v++)l.enqueue(I.holes[v])}}}s.push({outerRing:f,holes:w}),u.push({positions:C,positions2D:g,holes:m})}}}return{hierarchy:s,polygons:u}};var E=new i.Cartesian2,A=new i.Cartesian3,P=new f.Quaternion,_=new f.Matrix3;y.computeBoundingRectangle=function(e,t,r,n,o){n=f.Quaternion.fromAxisAngle(e,n,P);for(var s=f.Matrix3.fromQuaternion(n,_),u=Number.POSITIVE_INFINITY,l=Number.NEGATIVE_INFINITY,h=Number.POSITIVE_INFINITY,c=Number.NEGATIVE_INFINITY,p=r.length,d=0;d<p;++d){var y=i.Cartesian3.clone(r[d],A);f.Matrix3.multiplyByVector(s,y,y),y=t(y,E),a.defined(y)&&(u=Math.min(u,y.x),l=Math.max(l,y.x),h=Math.min(h,y.y),c=Math.max(c,y.y))}return o.x=u,o.y=h,o.width=l-u,o.height=c-h,o},y.createGeometryFromPositions=function(e,r,i,a,o,u){var h=p.PolygonPipeline.triangulate(r.positions2D,r.holes);h.length<3&&(h=[0,1,2]);var c=r.positions;if(a){for(var f=c.length,d=new Array(3*f),y=0,g=0;g<f;g++){var m=c[g];d[y++]=m.x,d[y++]=m.y,d[y++]=m.z}return a=new s.Geometry({attributes:{position:new s.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:d})},indices:h,primitiveType:s.PrimitiveType.TRIANGLES}),o.normal?l.GeometryPipeline.computeNormal(a):a}return u===t.ArcType.GEODESIC?p.PolygonPipeline.computeSubdivision(e,c,h,i):u===t.ArcType.RHUMB?p.PolygonPipeline.computeRhumbLineSubdivision(e,c,h,i):void 0};var G=[],L=new i.Cartesian3,M=new i.Cartesian3;y.computeWallGeometry=function(e,r,a,o,l){var f,p,d,g=e.length,m=0;if(o)for(p=3*g*2,f=new Array(2*p),d=0;d<g;d++)w=e[d],T=e[(d+1)%g],f[m]=f[m+p]=w.x,f[++m]=f[m+p]=w.y,f[++m]=f[m+p]=w.z,f[++m]=f[m+p]=T.x,f[++m]=f[m+p]=T.y,f[++m]=f[m+p]=T.z,++m;else{var v=c.CesiumMath.chordLength(a,r.maximumRadius),C=0;if(l===t.ArcType.GEODESIC)for(d=0;d<g;d++)C+=y.subdivideLineCount(e[d],e[(d+1)%g],v);else if(l===t.ArcType.RHUMB)for(d=0;d<g;d++)C+=y.subdivideRhumbLineCount(r,e[d],e[(d+1)%g],v);for(p=3*(C+g),f=new Array(2*p),d=0;d<g;d++){var b,w=e[d],T=e[(d+1)%g];l===t.ArcType.GEODESIC?b=y.subdivideLine(w,T,v,G):l===t.ArcType.RHUMB&&(b=y.subdivideRhumbLine(r,w,T,v,G));for(var I=b.length,x=0;x<I;++x,++m)f[m]=b[x],f[m+p]=b[x];f[m]=T.x,f[m+p]=T.x,f[++m]=T.y,f[m+p]=T.y,f[++m]=T.z,f[m+p]=T.z,++m}}g=f.length;var E=h.IndexDatatype.createTypedArray(g/3,g-6*e.length),A=0;for(g/=6,d=0;d<g;d++){var P=d,_=P+1,D=P+g,S=D+1;w=i.Cartesian3.fromArray(f,3*P,L),T=i.Cartesian3.fromArray(f,3*_,M),i.Cartesian3.equalsEpsilon(w,T,c.CesiumMath.EPSILON10,c.CesiumMath.EPSILON10)||(E[A++]=P,E[A++]=D,E[A++]=_,E[A++]=_,E[A++]=D,E[A++]=S)}return new s.Geometry({attributes:new u.GeometryAttributes({position:new s.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:f})}),indices:E,primitiveType:s.PrimitiveType.TRIANGLES})},e.PolygonGeometryLibrary=y}));