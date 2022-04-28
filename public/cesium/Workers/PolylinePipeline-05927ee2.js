define(["exports","./Cartesian2-08065eec","./when-ad3237a0","./Check-be2d5acb","./EllipsoidGeodesic-dc284f08","./EllipsoidRhumbLine-4a6ed5de","./IntersectionTests-75083888","./Math-5ca9b250","./Transforms-1142ce48","./Plane-bb88dd7e"],(function(a,e,r,t,n,i,o,s,c,l){"use strict";var u={numberOfPoints:function(a,r,t){return r=e.Cartesian3.distance(a,r),Math.ceil(r/t)},numberOfPointsRhumbLine:function(a,e,r){return e=Math.pow(a.longitude-e.longitude,2)+Math.pow(a.latitude-e.latitude,2),Math.max(1,Math.ceil(Math.sqrt(e/(r*r))))}},h=new e.Cartographic;u.extractHeights=function(a,e){for(var r=a.length,t=new Array(r),n=0;n<r;n++){var i=a[n];t[n]=e.cartesianToCartographic(i,h).height}return t};var g=new c.Matrix4,C=new e.Cartesian3,f=new e.Cartesian3,d=new l.Plane(e.Cartesian3.UNIT_X,0),p=new e.Cartesian3,m=new l.Plane(e.Cartesian3.UNIT_X,0),v=new e.Cartesian3,w=new e.Cartesian3,P=[];function T(a,e,r){var t=P;if(t.length=a,e===r){for(i=0;i<a;i++)t[i]=e;return t}for(var n=(r-e)/a,i=0;i<a;i++)t[i]=e+i*n;return t}var y=new e.Cartographic,A=new e.Cartographic,b=new e.Cartesian3,E=new e.Cartesian3,R=new e.Cartesian3,M=new n.EllipsoidGeodesic,S=new i.EllipsoidRhumbLine;u.wrapLongitude=function(a,t){var n=[],i=[];if(r.defined(a)&&0<a.length){t=r.defaultValue(t,c.Matrix4.IDENTITY);var s=c.Matrix4.inverseTransformation(t,g),u=(t=c.Matrix4.multiplyByPoint(s,e.Cartesian3.ZERO,C),e.Cartesian3.normalize(c.Matrix4.multiplyByPointAsVector(s,e.Cartesian3.UNIT_Y,f),f)),h=l.Plane.fromPointNormal(t,u,d),P=(s=e.Cartesian3.normalize(c.Matrix4.multiplyByPointAsVector(s,e.Cartesian3.UNIT_X,p),p),l.Plane.fromPointNormal(t,s,m)),T=1;n.push(e.Cartesian3.clone(a[0]));for(var y=n[0],A=a.length,b=1;b<A;++b){var E,R,M=a[b];(l.Plane.getPointDistance(P,y)<0||l.Plane.getPointDistance(P,M)<0)&&(E=o.IntersectionTests.lineSegmentPlane(y,M,h,v),r.defined(E)&&(R=e.Cartesian3.multiplyByScalar(u,5e-9,w),l.Plane.getPointDistance(h,y)<0&&e.Cartesian3.negate(R,R),n.push(e.Cartesian3.add(E,R,new e.Cartesian3)),i.push(T+1),e.Cartesian3.negate(R,R),n.push(e.Cartesian3.add(E,R,new e.Cartesian3)),T=1)),n.push(e.Cartesian3.clone(a[b])),T++,y=M}i.push(T)}return{positions:n,lengths:i}},u.generateArc=function(a){var t=(a=r.defined(a)?a:{}).positions,n=t.length,i=r.defaultValue(a.ellipsoid,e.Ellipsoid.WGS84),o=r.defaultValue(a.height,0),c=Array.isArray(o);if(n<1)return[];if(1===n){var l,h=i.scaleToGeodeticSurface(t[0],E);return 0!==(o=c?o[0]:o)&&(l=i.geodeticSurfaceNormal(h,b),e.Cartesian3.multiplyByScalar(l,o,l),e.Cartesian3.add(h,l,h)),[h.x,h.y,h.z]}var g=a.minDistance;r.defined(g)||(m=r.defaultValue(a.granularity,s.CesiumMath.RADIANS_PER_DEGREE),g=s.CesiumMath.chordLength(m,i.maximumRadius));for(var C=0,f=0;f<n-1;f++)C+=u.numberOfPoints(t[f],t[f+1],g);a=3*(C+1);var d=new Array(a),p=0;for(f=0;f<n-1;f++)p=function(a,r,t,n,i,o,s,c){var l=n.scaleToGeodeticSurface(a,E),h=n.scaleToGeodeticSurface(r,R),g=u.numberOfPoints(a,r,t),C=(l=n.cartesianToCartographic(l,y),h=n.cartesianToCartographic(h,A),T(g,i,o));M.setEndPoints(l,h);var f=M.surfaceDistance/g,d=c;l.height=i;var p=n.cartographicToCartesian(l,b);e.Cartesian3.pack(p,s,d),d+=3;for(var m=1;m<g;m++){var v=M.interpolateUsingSurfaceDistance(m*f,A);v.height=C[m],p=n.cartographicToCartesian(v,b),e.Cartesian3.pack(p,s,d),d+=3}return d}(t[f],t[f+1],g,i,c?o[f]:o,c?o[f+1]:o,d,p);P.length=0;var m=t[n-1];return(m=i.cartesianToCartographic(m,y)).height=c?o[n-1]:o,m=i.cartographicToCartesian(m,b),e.Cartesian3.pack(m,d,a-3),d};var D=new e.Cartographic,x=new e.Cartographic;u.generateRhumbArc=function(a){var t=(a=r.defined(a)?a:{}).positions,n=t.length,o=r.defaultValue(a.ellipsoid,e.Ellipsoid.WGS84),c=r.defaultValue(a.height,0),l=Array.isArray(c);if(n<1)return[];if(1===n){var h,g=o.scaleToGeodeticSurface(t[0],E);return 0!==(c=l?c[0]:c)&&(h=o.geodeticSurfaceNormal(g,b),e.Cartesian3.multiplyByScalar(h,c,h),e.Cartesian3.add(g,h,g)),[g.x,g.y,g.z]}for(var C,f=r.defaultValue(a.granularity,s.CesiumMath.RADIANS_PER_DEGREE),d=0,p=o.cartesianToCartographic(t[0],D),m=0;m<n-1;m++)C=o.cartesianToCartographic(t[m+1],x),d+=u.numberOfPointsRhumbLine(p,C,f),p=e.Cartographic.clone(C,D);g=3*(d+1);var v=new Array(g),w=0;for(m=0;m<n-1;m++)w=function(a,r,t,n,o,s,c,l){a=n.cartesianToCartographic(a,y),r=n.cartesianToCartographic(r,A);var h=u.numberOfPointsRhumbLine(a,r,t);a.height=0,r.height=0;var g=T(h,o,s);(S=S.ellipsoid.equals(n)?S:new i.EllipsoidRhumbLine(void 0,void 0,n)).setEndPoints(a,r);var C=S.surfaceDistance/h,f=l;a.height=o;var d=n.cartographicToCartesian(a,b);e.Cartesian3.pack(d,c,f),f+=3;for(var p=1;p<h;p++){var m=S.interpolateUsingSurfaceDistance(p*C,A);m.height=g[p],d=n.cartographicToCartesian(m,b),e.Cartesian3.pack(d,c,f),f+=3}return f}(t[m],t[m+1],f,o,l?c[m]:c,l?c[m+1]:c,v,w);return P.length=0,a=t[n-1],(a=o.cartesianToCartographic(a,y)).height=l?c[n-1]:c,a=o.cartographicToCartesian(a,b),e.Cartesian3.pack(a,v,g-3),v},u.generateCartesianArc=function(a){for(var r=u.generateArc(a),t=r.length/3,n=new Array(t),i=0;i<t;i++)n[i]=e.Cartesian3.unpack(r,3*i);return n},u.generateCartesianRhumbArc=function(a){for(var r=u.generateRhumbArc(a),t=r.length/3,n=new Array(t),i=0;i<t;i++)n[i]=e.Cartesian3.unpack(r,3*i);return n},a.PolylinePipeline=u}));