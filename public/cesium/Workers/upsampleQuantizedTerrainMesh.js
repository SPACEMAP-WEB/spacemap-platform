define(["./AttributeCompression-27507afe","./Transforms-dca21951","./Matrix2-37e55508","./defaultValue-81eec7ed","./TerrainEncoding-48ceaaca","./IndexDatatype-f1dcdf35","./RuntimeError-8952249c","./ComponentDatatype-a15c9a19","./OrientedBoundingBox-86a6888d","./createTaskProcessorWorker","./_commonjsHelpers-3aae1032-26891ab7","./combine-3c023bda","./WebGLConstants-508b9636","./EllipsoidTangentPlane-06e319ef","./AxisAlignedBoundingBox-0ddf9b79","./IntersectionTests-ee135b8e","./Plane-6ee42cab"],(function(e,t,n,i,s,h,r,u,o,p,d,a,l,f,c,g,m){"use strict";const x=function(e,t,n,s,h,r){let u,o,p;i.defined(r)?r.length=0:r=[],t?(u=n<e,o=s<e,p=h<e):(u=n>e,o=s>e,p=h>e);const d=u+o+p;let a,l,f,c,g,m;return 1===d?u?(a=(e-n)/(s-n),l=(e-n)/(h-n),r.push(1),r.push(2),1!==l&&(r.push(-1),r.push(0),r.push(2),r.push(l)),1!==a&&(r.push(-1),r.push(0),r.push(1),r.push(a))):o?(f=(e-s)/(h-s),c=(e-s)/(n-s),r.push(2),r.push(0),1!==c&&(r.push(-1),r.push(1),r.push(0),r.push(c)),1!==f&&(r.push(-1),r.push(1),r.push(2),r.push(f))):p&&(g=(e-h)/(n-h),m=(e-h)/(s-h),r.push(0),r.push(1),1!==m&&(r.push(-1),r.push(2),r.push(1),r.push(m)),1!==g&&(r.push(-1),r.push(2),r.push(0),r.push(g))):2===d?u||n===e?o||s===e?p||h===e||(l=(e-n)/(h-n),f=(e-s)/(h-s),r.push(2),r.push(-1),r.push(0),r.push(2),r.push(l),r.push(-1),r.push(1),r.push(2),r.push(f)):(m=(e-h)/(s-h),a=(e-n)/(s-n),r.push(1),r.push(-1),r.push(2),r.push(1),r.push(m),r.push(-1),r.push(0),r.push(1),r.push(a)):(c=(e-s)/(n-s),g=(e-h)/(n-h),r.push(0),r.push(-1),r.push(1),r.push(0),r.push(c),r.push(-1),r.push(2),r.push(0),r.push(g)):3!==d&&(r.push(0),r.push(1),r.push(2)),r},w=32767,C=16383,B=[],y=[],I=[],b=new n.Cartographic;let v=new n.Cartesian3;const A=[],V=[],z=[],M=[],N=[],E=new n.Cartesian3,H=new t.BoundingSphere,R=new o.OrientedBoundingBox,T=new n.Cartesian2,O=new n.Cartesian3;function U(){this.vertexBuffer=void 0,this.index=void 0,this.first=void 0,this.second=void 0,this.ratio=void 0}U.prototype.clone=function(e){return i.defined(e)||(e=new U),e.uBuffer=this.uBuffer,e.vBuffer=this.vBuffer,e.heightBuffer=this.heightBuffer,e.normalBuffer=this.normalBuffer,e.index=this.index,e.first=this.first,e.second=this.second,e.ratio=this.ratio,e},U.prototype.initializeIndexed=function(e,t,n,i,s){this.uBuffer=e,this.vBuffer=t,this.heightBuffer=n,this.normalBuffer=i,this.index=s,this.first=void 0,this.second=void 0,this.ratio=void 0},U.prototype.initializeFromClipResult=function(e,t,n){let i=t+1;return-1!==e[t]?n[e[t]].clone(this):(this.vertexBuffer=void 0,this.index=void 0,this.first=n[e[i]],++i,this.second=n[e[i]],++i,this.ratio=e[i],++i),i},U.prototype.getKey=function(){return this.isIndexed()?this.index:JSON.stringify({first:this.first.getKey(),second:this.second.getKey(),ratio:this.ratio})},U.prototype.isIndexed=function(){return i.defined(this.index)},U.prototype.getH=function(){return i.defined(this.index)?this.heightBuffer[this.index]:u.CesiumMath.lerp(this.first.getH(),this.second.getH(),this.ratio)},U.prototype.getU=function(){return i.defined(this.index)?this.uBuffer[this.index]:u.CesiumMath.lerp(this.first.getU(),this.second.getU(),this.ratio)},U.prototype.getV=function(){return i.defined(this.index)?this.vBuffer[this.index]:u.CesiumMath.lerp(this.first.getV(),this.second.getV(),this.ratio)};let F=new n.Cartesian2,P=-1;const S=[new n.Cartesian3,new n.Cartesian3],D=[new n.Cartesian3,new n.Cartesian3];function W(t,i){++P;let s=S[P],h=D[P];return s=e.AttributeCompression.octDecode(t.first.getNormalX(),t.first.getNormalY(),s),h=e.AttributeCompression.octDecode(t.second.getNormalX(),t.second.getNormalY(),h),v=n.Cartesian3.lerp(s,h,t.ratio,v),n.Cartesian3.normalize(v,v),e.AttributeCompression.octEncode(v,i),--P,i}U.prototype.getNormalX=function(){return i.defined(this.index)?this.normalBuffer[2*this.index]:(F=W(this,F),F.x)},U.prototype.getNormalY=function(){return i.defined(this.index)?this.normalBuffer[2*this.index+1]:(F=W(this,F),F.y)};const X=[];function k(e,t,n,s,h,r,u,o,p){if(0===u.length)return;let d=0,a=0;for(;a<u.length;)a=X[d++].initializeFromClipResult(u,a,o);for(let l=0;l<d;++l){const h=X[l];if(h.isIndexed())h.newIndex=r[h.index],h.uBuffer=e,h.vBuffer=t,h.heightBuffer=n,p&&(h.normalBuffer=s);else{const u=h.getKey();if(i.defined(r[u]))h.newIndex=r[u];else{const i=e.length;e.push(h.getU()),t.push(h.getV()),n.push(h.getH()),p&&(s.push(h.getNormalX()),s.push(h.getNormalY())),h.newIndex=i,r[u]=i}}}3===d?(h.push(X[0].newIndex),h.push(X[1].newIndex),h.push(X[2].newIndex)):4===d&&(h.push(X[0].newIndex),h.push(X[1].newIndex),h.push(X[2].newIndex),h.push(X[0].newIndex),h.push(X[2].newIndex),h.push(X[3].newIndex))}return X.push(new U),X.push(new U),X.push(new U),X.push(new U),p((function(e,i){const r=e.isEastChild,p=e.isNorthChild,d=r?C:0,a=r?w:C,l=p?C:0,f=p?w:C,c=A,g=V,m=z,F=N;c.length=0,g.length=0,m.length=0,F.length=0;const P=M;P.length=0;const S={},D=e.vertices;let W=e.indices;W=W.subarray(0,e.indexCountWithoutSkirts);const X=s.TerrainEncoding.clone(e.encoding),K=X.hasVertexNormals;let Y=0;const _=e.vertexCountWithoutSkirts,L=e.minimumHeight,j=e.maximumHeight,G=new Array(_),J=new Array(_),Z=new Array(_),q=K?new Array(2*_):void 0;let Q,$,ee,te,ne;for($=0,ee=0;$<_;++$,ee+=2){const e=X.decodeTextureCoordinates(D,$,T);if(Q=X.decodeHeight(D,$),te=u.CesiumMath.clamp(e.x*w|0,0,w),ne=u.CesiumMath.clamp(e.y*w|0,0,w),Z[$]=u.CesiumMath.clamp((Q-L)/(j-L)*w|0,0,w),te<20&&(te=0),ne<20&&(ne=0),w-te<20&&(te=w),w-ne<20&&(ne=w),G[$]=te,J[$]=ne,K){const e=X.getOctEncodedNormal(D,$,O);q[ee]=e.x,q[ee+1]=e.y}(r&&te>=C||!r&&te<=C)&&(p&&ne>=C||!p&&ne<=C)&&(S[$]=Y,c.push(te),g.push(ne),m.push(Z[$]),K&&(F.push(q[ee]),F.push(q[ee+1])),++Y)}const ie=[];ie.push(new U),ie.push(new U),ie.push(new U);const se=[];let he,re;for(se.push(new U),se.push(new U),se.push(new U),$=0;$<W.length;$+=3){const e=W[$],t=W[$+1],n=W[$+2],i=G[e],s=G[t],h=G[n];ie[0].initializeIndexed(G,J,Z,q,e),ie[1].initializeIndexed(G,J,Z,q,t),ie[2].initializeIndexed(G,J,Z,q,n);const u=x(C,r,i,s,h,B);he=0,he>=u.length||(he=se[0].initializeFromClipResult(u,he,ie),he>=u.length||(he=se[1].initializeFromClipResult(u,he,ie),he>=u.length||(he=se[2].initializeFromClipResult(u,he,ie),re=x(C,p,se[0].getV(),se[1].getV(),se[2].getV(),y),k(c,g,m,F,P,S,re,se,K),he<u.length&&(se[2].clone(se[1]),se[2].initializeFromClipResult(u,he,ie),re=x(C,p,se[0].getV(),se[1].getV(),se[2].getV(),y),k(c,g,m,F,P,S,re,se,K)))))}const ue=r?-32767:0,oe=p?-32767:0,pe=[],de=[],ae=[],le=[];let fe=Number.MAX_VALUE,ce=-fe;const ge=I;ge.length=0;const me=n.Ellipsoid.clone(e.ellipsoid),xe=n.Rectangle.clone(e.childRectangle),we=xe.north,Ce=xe.south;let Be=xe.east;const ye=xe.west;for(Be<ye&&(Be+=u.CesiumMath.TWO_PI),$=0;$<c.length;++$)te=Math.round(c[$]),te<=d?(pe.push($),te=0):te>=a?(ae.push($),te=w):te=2*te+ue,c[$]=te,ne=Math.round(g[$]),ne<=l?(de.push($),ne=0):ne>=f?(le.push($),ne=w):ne=2*ne+oe,g[$]=ne,Q=u.CesiumMath.lerp(L,j,m[$]/w),Q<fe&&(fe=Q),Q>ce&&(ce=Q),m[$]=Q,b.longitude=u.CesiumMath.lerp(ye,Be,te/w),b.latitude=u.CesiumMath.lerp(Ce,we,ne/w),b.height=Q,me.cartographicToCartesian(b,v),ge.push(v.x),ge.push(v.y),ge.push(v.z);const Ie=t.BoundingSphere.fromVertices(ge,n.Cartesian3.ZERO,3,H),be=o.OrientedBoundingBox.fromRectangle(xe,fe,ce,me,R),ve=new s.EllipsoidalOccluder(me).computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid(Ie.center,ge,3,Ie.center,fe,E),Ae=ce-fe,Ve=new Uint16Array(c.length+g.length+m.length);for($=0;$<c.length;++$)Ve[$]=c[$];let ze=c.length;for($=0;$<g.length;++$)Ve[ze+$]=g[$];for(ze+=g.length,$=0;$<m.length;++$)Ve[ze+$]=w*(m[$]-fe)/Ae;const Me=h.IndexDatatype.createTypedArray(c.length,P);let Ne;if(K){const e=new Uint8Array(F);i.push(Ve.buffer,Me.buffer,e.buffer),Ne=e.buffer}else i.push(Ve.buffer,Me.buffer);return{vertices:Ve.buffer,encodedNormals:Ne,indices:Me.buffer,minimumHeight:fe,maximumHeight:ce,westIndices:pe,southIndices:de,eastIndices:ae,northIndices:le,boundingSphere:Ie,orientedBoundingBox:be,horizonOcclusionPoint:ve}}))}));