define(["./defaultValue-81eec7ed","./RuntimeError-8952249c","./WebGLConstants-508b9636","./createTaskProcessorWorker"],(function(_,R,t,A){"use strict";const e={UNSIGNED_BYTE:t.WebGLConstants.UNSIGNED_BYTE,UNSIGNED_SHORT:t.WebGLConstants.UNSIGNED_SHORT,UNSIGNED_INT:t.WebGLConstants.UNSIGNED_INT,FLOAT:t.WebGLConstants.FLOAT,HALF_FLOAT:t.WebGLConstants.HALF_FLOAT_OES,UNSIGNED_INT_24_8:t.WebGLConstants.UNSIGNED_INT_24_8,UNSIGNED_SHORT_4_4_4_4:t.WebGLConstants.UNSIGNED_SHORT_4_4_4_4,UNSIGNED_SHORT_5_5_5_1:t.WebGLConstants.UNSIGNED_SHORT_5_5_5_1,UNSIGNED_SHORT_5_6_5:t.WebGLConstants.UNSIGNED_SHORT_5_6_5,toWebGLConstant:function(_,R){switch(_){case e.UNSIGNED_BYTE:return t.WebGLConstants.UNSIGNED_BYTE;case e.UNSIGNED_SHORT:return t.WebGLConstants.UNSIGNED_SHORT;case e.UNSIGNED_INT:return t.WebGLConstants.UNSIGNED_INT;case e.FLOAT:return t.WebGLConstants.FLOAT;case e.HALF_FLOAT:return R.webgl2?t.WebGLConstants.HALF_FLOAT:t.WebGLConstants.HALF_FLOAT_OES;case e.UNSIGNED_INT_24_8:return t.WebGLConstants.UNSIGNED_INT_24_8;case e.UNSIGNED_SHORT_4_4_4_4:return t.WebGLConstants.UNSIGNED_SHORT_4_4_4_4;case e.UNSIGNED_SHORT_5_5_5_1:return t.WebGLConstants.UNSIGNED_SHORT_5_5_5_1;case e.UNSIGNED_SHORT_5_6_5:return e.UNSIGNED_SHORT_5_6_5}},isPacked:function(_){return _===e.UNSIGNED_INT_24_8||_===e.UNSIGNED_SHORT_4_4_4_4||_===e.UNSIGNED_SHORT_5_5_5_1||_===e.UNSIGNED_SHORT_5_6_5},sizeInBytes:function(_){switch(_){case e.UNSIGNED_BYTE:return 1;case e.UNSIGNED_SHORT:case e.UNSIGNED_SHORT_4_4_4_4:case e.UNSIGNED_SHORT_5_5_5_1:case e.UNSIGNED_SHORT_5_6_5:case e.HALF_FLOAT:return 2;case e.UNSIGNED_INT:case e.FLOAT:case e.UNSIGNED_INT_24_8:return 4}},validate:function(_){return _===e.UNSIGNED_BYTE||_===e.UNSIGNED_SHORT||_===e.UNSIGNED_INT||_===e.FLOAT||_===e.HALF_FLOAT||_===e.UNSIGNED_INT_24_8||_===e.UNSIGNED_SHORT_4_4_4_4||_===e.UNSIGNED_SHORT_5_5_5_1||_===e.UNSIGNED_SHORT_5_6_5}};var T=Object.freeze(e);const O={DEPTH_COMPONENT:t.WebGLConstants.DEPTH_COMPONENT,DEPTH_STENCIL:t.WebGLConstants.DEPTH_STENCIL,ALPHA:t.WebGLConstants.ALPHA,RGB:t.WebGLConstants.RGB,RGBA:t.WebGLConstants.RGBA,LUMINANCE:t.WebGLConstants.LUMINANCE,LUMINANCE_ALPHA:t.WebGLConstants.LUMINANCE_ALPHA,RGB_DXT1:t.WebGLConstants.COMPRESSED_RGB_S3TC_DXT1_EXT,RGBA_DXT1:t.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT1_EXT,RGBA_DXT3:t.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT3_EXT,RGBA_DXT5:t.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT5_EXT,RGB_PVRTC_4BPPV1:t.WebGLConstants.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,RGB_PVRTC_2BPPV1:t.WebGLConstants.COMPRESSED_RGB_PVRTC_2BPPV1_IMG,RGBA_PVRTC_4BPPV1:t.WebGLConstants.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,RGBA_PVRTC_2BPPV1:t.WebGLConstants.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG,RGBA_ASTC:t.WebGLConstants.COMPRESSED_RGBA_ASTC_4x4_WEBGL,RGB_ETC1:t.WebGLConstants.COMPRESSED_RGB_ETC1_WEBGL,RGB8_ETC2:t.WebGLConstants.COMPRESSED_RGB8_ETC2,RGBA8_ETC2_EAC:t.WebGLConstants.COMPRESSED_RGBA8_ETC2_EAC,RGBA_BC7:t.WebGLConstants.COMPRESSED_RGBA_BPTC_UNORM,componentsLength:function(_){switch(_){case O.RGB:return 3;case O.RGBA:return 4;case O.LUMINANCE_ALPHA:return 2;case O.ALPHA:case O.LUMINANCE:default:return 1}},validate:function(_){return _===O.DEPTH_COMPONENT||_===O.DEPTH_STENCIL||_===O.ALPHA||_===O.RGB||_===O.RGBA||_===O.LUMINANCE||_===O.LUMINANCE_ALPHA||_===O.RGB_DXT1||_===O.RGBA_DXT1||_===O.RGBA_DXT3||_===O.RGBA_DXT5||_===O.RGB_PVRTC_4BPPV1||_===O.RGB_PVRTC_2BPPV1||_===O.RGBA_PVRTC_4BPPV1||_===O.RGBA_PVRTC_2BPPV1||_===O.RGBA_ASTC||_===O.RGB_ETC1||_===O.RGB8_ETC2||_===O.RGBA8_ETC2_EAC||_===O.RGBA_BC7},isColorFormat:function(_){return _===O.ALPHA||_===O.RGB||_===O.RGBA||_===O.LUMINANCE||_===O.LUMINANCE_ALPHA},isDepthFormat:function(_){return _===O.DEPTH_COMPONENT||_===O.DEPTH_STENCIL},isCompressedFormat:function(_){return _===O.RGB_DXT1||_===O.RGBA_DXT1||_===O.RGBA_DXT3||_===O.RGBA_DXT5||_===O.RGB_PVRTC_4BPPV1||_===O.RGB_PVRTC_2BPPV1||_===O.RGBA_PVRTC_4BPPV1||_===O.RGBA_PVRTC_2BPPV1||_===O.RGBA_ASTC||_===O.RGB_ETC1||_===O.RGB8_ETC2||_===O.RGBA8_ETC2_EAC||_===O.RGBA_BC7},isDXTFormat:function(_){return _===O.RGB_DXT1||_===O.RGBA_DXT1||_===O.RGBA_DXT3||_===O.RGBA_DXT5},isPVRTCFormat:function(_){return _===O.RGB_PVRTC_4BPPV1||_===O.RGB_PVRTC_2BPPV1||_===O.RGBA_PVRTC_4BPPV1||_===O.RGBA_PVRTC_2BPPV1},isASTCFormat:function(_){return _===O.RGBA_ASTC},isETC1Format:function(_){return _===O.RGB_ETC1},isETC2Format:function(_){return _===O.RGB8_ETC2||_===O.RGBA8_ETC2_EAC},isBC7Format:function(_){return _===O.RGBA_BC7},compressedTextureSizeInBytes:function(_,R,t){switch(_){case O.RGB_DXT1:case O.RGBA_DXT1:case O.RGB_ETC1:case O.RGB8_ETC2:return Math.floor((R+3)/4)*Math.floor((t+3)/4)*8;case O.RGBA_DXT3:case O.RGBA_DXT5:case O.RGBA_ASTC:case O.RGBA8_ETC2_EAC:return Math.floor((R+3)/4)*Math.floor((t+3)/4)*16;case O.RGB_PVRTC_4BPPV1:case O.RGBA_PVRTC_4BPPV1:return Math.floor((Math.max(R,8)*Math.max(t,8)*4+7)/8);case O.RGB_PVRTC_2BPPV1:case O.RGBA_PVRTC_2BPPV1:return Math.floor((Math.max(R,16)*Math.max(t,8)*2+7)/8);case O.RGBA_BC7:return Math.ceil(R/4)*Math.ceil(t/4)*16;default:return 0}},textureSizeInBytes:function(_,R,t,A){let e=O.componentsLength(_);return T.isPacked(R)&&(e=1),e*T.sizeInBytes(R)*t*A},alignmentInBytes:function(_,R,t){const A=O.textureSizeInBytes(_,R,t,1)%4;return 0===A?4:2===A?2:1},createTypedArray:function(_,R,t,A){let e;const n=T.sizeInBytes(R);return e=n===Uint8Array.BYTES_PER_ELEMENT?Uint8Array:n===Uint16Array.BYTES_PER_ELEMENT?Uint16Array:n===Float32Array.BYTES_PER_ELEMENT&&R===T.FLOAT?Float32Array:Uint32Array,new e(O.componentsLength(_)*t*A)},flipY:function(_,R,t,A,e){if(1===e)return _;const T=O.createTypedArray(R,t,A,e),n=O.componentsLength(R),B=A*n;for(let O=0;O<e;++O){const R=O*A*n,t=(e-O-1)*A*n;for(let A=0;A<B;++A)T[t+A]=_[R+A]}return T},toInternalFormat:function(_,R,A){if(!A.webgl2)return _;if(_===O.DEPTH_STENCIL)return t.WebGLConstants.DEPTH24_STENCIL8;if(_===O.DEPTH_COMPONENT){if(R===T.UNSIGNED_SHORT)return t.WebGLConstants.DEPTH_COMPONENT16;if(R===T.UNSIGNED_INT)return t.WebGLConstants.DEPTH_COMPONENT24}if(R===T.FLOAT)switch(_){case O.RGBA:return t.WebGLConstants.RGBA32F;case O.RGB:return t.WebGLConstants.RGB32F;case O.RG:return t.WebGLConstants.RG32F;case O.R:return t.WebGLConstants.R32F}if(R===T.HALF_FLOAT)switch(_){case O.RGBA:return t.WebGLConstants.RGBA16F;case O.RGB:return t.WebGLConstants.RGB16F;case O.RG:return t.WebGLConstants.RG16F;case O.R:return t.WebGLConstants.R16F}return _}};var n=Object.freeze(O),B=Object.freeze({VK_FORMAT_UNDEFINED:0,VK_FORMAT_R4G4_UNORM_PACK8:1,VK_FORMAT_R4G4B4A4_UNORM_PACK16:2,VK_FORMAT_B4G4R4A4_UNORM_PACK16:3,VK_FORMAT_R5G6B5_UNORM_PACK16:4,VK_FORMAT_B5G6R5_UNORM_PACK16:5,VK_FORMAT_R5G5B5A1_UNORM_PACK16:6,VK_FORMAT_B5G5R5A1_UNORM_PACK16:7,VK_FORMAT_A1R5G5B5_UNORM_PACK16:8,VK_FORMAT_R8_UNORM:9,VK_FORMAT_R8_SNORM:10,VK_FORMAT_R8_USCALED:11,VK_FORMAT_R8_SSCALED:12,VK_FORMAT_R8_UINT:13,VK_FORMAT_R8_SINT:14,VK_FORMAT_R8_SRGB:15,VK_FORMAT_R8G8_UNORM:16,VK_FORMAT_R8G8_SNORM:17,VK_FORMAT_R8G8_USCALED:18,VK_FORMAT_R8G8_SSCALED:19,VK_FORMAT_R8G8_UINT:20,VK_FORMAT_R8G8_SINT:21,VK_FORMAT_R8G8_SRGB:22,VK_FORMAT_R8G8B8_UNORM:23,VK_FORMAT_R8G8B8_SNORM:24,VK_FORMAT_R8G8B8_USCALED:25,VK_FORMAT_R8G8B8_SSCALED:26,VK_FORMAT_R8G8B8_UINT:27,VK_FORMAT_R8G8B8_SINT:28,VK_FORMAT_R8G8B8_SRGB:29,VK_FORMAT_B8G8R8_UNORM:30,VK_FORMAT_B8G8R8_SNORM:31,VK_FORMAT_B8G8R8_USCALED:32,VK_FORMAT_B8G8R8_SSCALED:33,VK_FORMAT_B8G8R8_UINT:34,VK_FORMAT_B8G8R8_SINT:35,VK_FORMAT_B8G8R8_SRGB:36,VK_FORMAT_R8G8B8A8_UNORM:37,VK_FORMAT_R8G8B8A8_SNORM:38,VK_FORMAT_R8G8B8A8_USCALED:39,VK_FORMAT_R8G8B8A8_SSCALED:40,VK_FORMAT_R8G8B8A8_UINT:41,VK_FORMAT_R8G8B8A8_SINT:42,VK_FORMAT_R8G8B8A8_SRGB:43,VK_FORMAT_B8G8R8A8_UNORM:44,VK_FORMAT_B8G8R8A8_SNORM:45,VK_FORMAT_B8G8R8A8_USCALED:46,VK_FORMAT_B8G8R8A8_SSCALED:47,VK_FORMAT_B8G8R8A8_UINT:48,VK_FORMAT_B8G8R8A8_SINT:49,VK_FORMAT_B8G8R8A8_SRGB:50,VK_FORMAT_A8B8G8R8_UNORM_PACK32:51,VK_FORMAT_A8B8G8R8_SNORM_PACK32:52,VK_FORMAT_A8B8G8R8_USCALED_PACK32:53,VK_FORMAT_A8B8G8R8_SSCALED_PACK32:54,VK_FORMAT_A8B8G8R8_UINT_PACK32:55,VK_FORMAT_A8B8G8R8_SINT_PACK32:56,VK_FORMAT_A8B8G8R8_SRGB_PACK32:57,VK_FORMAT_A2R10G10B10_UNORM_PACK32:58,VK_FORMAT_A2R10G10B10_SNORM_PACK32:59,VK_FORMAT_A2R10G10B10_USCALED_PACK32:60,VK_FORMAT_A2R10G10B10_SSCALED_PACK32:61,VK_FORMAT_A2R10G10B10_UINT_PACK32:62,VK_FORMAT_A2R10G10B10_SINT_PACK32:63,VK_FORMAT_A2B10G10R10_UNORM_PACK32:64,VK_FORMAT_A2B10G10R10_SNORM_PACK32:65,VK_FORMAT_A2B10G10R10_USCALED_PACK32:66,VK_FORMAT_A2B10G10R10_SSCALED_PACK32:67,VK_FORMAT_A2B10G10R10_UINT_PACK32:68,VK_FORMAT_A2B10G10R10_SINT_PACK32:69,VK_FORMAT_R16_UNORM:70,VK_FORMAT_R16_SNORM:71,VK_FORMAT_R16_USCALED:72,VK_FORMAT_R16_SSCALED:73,VK_FORMAT_R16_UINT:74,VK_FORMAT_R16_SINT:75,VK_FORMAT_R16_SFLOAT:76,VK_FORMAT_R16G16_UNORM:77,VK_FORMAT_R16G16_SNORM:78,VK_FORMAT_R16G16_USCALED:79,VK_FORMAT_R16G16_SSCALED:80,VK_FORMAT_R16G16_UINT:81,VK_FORMAT_R16G16_SINT:82,VK_FORMAT_R16G16_SFLOAT:83,VK_FORMAT_R16G16B16_UNORM:84,VK_FORMAT_R16G16B16_SNORM:85,VK_FORMAT_R16G16B16_USCALED:86,VK_FORMAT_R16G16B16_SSCALED:87,VK_FORMAT_R16G16B16_UINT:88,VK_FORMAT_R16G16B16_SINT:89,VK_FORMAT_R16G16B16_SFLOAT:90,VK_FORMAT_R16G16B16A16_UNORM:91,VK_FORMAT_R16G16B16A16_SNORM:92,VK_FORMAT_R16G16B16A16_USCALED:93,VK_FORMAT_R16G16B16A16_SSCALED:94,VK_FORMAT_R16G16B16A16_UINT:95,VK_FORMAT_R16G16B16A16_SINT:96,VK_FORMAT_R16G16B16A16_SFLOAT:97,VK_FORMAT_R32_UINT:98,VK_FORMAT_R32_SINT:99,VK_FORMAT_R32_SFLOAT:100,VK_FORMAT_R32G32_UINT:101,VK_FORMAT_R32G32_SINT:102,VK_FORMAT_R32G32_SFLOAT:103,VK_FORMAT_R32G32B32_UINT:104,VK_FORMAT_R32G32B32_SINT:105,VK_FORMAT_R32G32B32_SFLOAT:106,VK_FORMAT_R32G32B32A32_UINT:107,VK_FORMAT_R32G32B32A32_SINT:108,VK_FORMAT_R32G32B32A32_SFLOAT:109,VK_FORMAT_R64_UINT:110,VK_FORMAT_R64_SINT:111,VK_FORMAT_R64_SFLOAT:112,VK_FORMAT_R64G64_UINT:113,VK_FORMAT_R64G64_SINT:114,VK_FORMAT_R64G64_SFLOAT:115,VK_FORMAT_R64G64B64_UINT:116,VK_FORMAT_R64G64B64_SINT:117,VK_FORMAT_R64G64B64_SFLOAT:118,VK_FORMAT_R64G64B64A64_UINT:119,VK_FORMAT_R64G64B64A64_SINT:120,VK_FORMAT_R64G64B64A64_SFLOAT:121,VK_FORMAT_B10G11R11_UFLOAT_PACK32:122,VK_FORMAT_E5B9G9R9_UFLOAT_PACK32:123,VK_FORMAT_D16_UNORM:124,VK_FORMAT_X8_D24_UNORM_PACK32:125,VK_FORMAT_D32_SFLOAT:126,VK_FORMAT_S8_UINT:127,VK_FORMAT_D16_UNORM_S8_UINT:128,VK_FORMAT_D24_UNORM_S8_UINT:129,VK_FORMAT_D32_SFLOAT_S8_UINT:130,VK_FORMAT_BC1_RGB_UNORM_BLOCK:131,VK_FORMAT_BC1_RGB_SRGB_BLOCK:132,VK_FORMAT_BC1_RGBA_UNORM_BLOCK:133,VK_FORMAT_BC1_RGBA_SRGB_BLOCK:134,VK_FORMAT_BC2_UNORM_BLOCK:135,VK_FORMAT_BC2_SRGB_BLOCK:136,VK_FORMAT_BC3_UNORM_BLOCK:137,VK_FORMAT_BC3_SRGB_BLOCK:138,VK_FORMAT_BC4_UNORM_BLOCK:139,VK_FORMAT_BC4_SNORM_BLOCK:140,VK_FORMAT_BC5_UNORM_BLOCK:141,VK_FORMAT_BC5_SNORM_BLOCK:142,VK_FORMAT_BC6H_UFLOAT_BLOCK:143,VK_FORMAT_BC6H_SFLOAT_BLOCK:144,VK_FORMAT_BC7_UNORM_BLOCK:145,VK_FORMAT_BC7_SRGB_BLOCK:146,VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK:147,VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK:148,VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK:149,VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK:150,VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK:151,VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK:152,VK_FORMAT_EAC_R11_UNORM_BLOCK:153,VK_FORMAT_EAC_R11_SNORM_BLOCK:154,VK_FORMAT_EAC_R11G11_UNORM_BLOCK:155,VK_FORMAT_EAC_R11G11_SNORM_BLOCK:156,VK_FORMAT_ASTC_4x4_UNORM_BLOCK:157,VK_FORMAT_ASTC_4x4_SRGB_BLOCK:158,VK_FORMAT_ASTC_5x4_UNORM_BLOCK:159,VK_FORMAT_ASTC_5x4_SRGB_BLOCK:160,VK_FORMAT_ASTC_5x5_UNORM_BLOCK:161,VK_FORMAT_ASTC_5x5_SRGB_BLOCK:162,VK_FORMAT_ASTC_6x5_UNORM_BLOCK:163,VK_FORMAT_ASTC_6x5_SRGB_BLOCK:164,VK_FORMAT_ASTC_6x6_UNORM_BLOCK:165,VK_FORMAT_ASTC_6x6_SRGB_BLOCK:166,VK_FORMAT_ASTC_8x5_UNORM_BLOCK:167,VK_FORMAT_ASTC_8x5_SRGB_BLOCK:168,VK_FORMAT_ASTC_8x6_UNORM_BLOCK:169,VK_FORMAT_ASTC_8x6_SRGB_BLOCK:170,VK_FORMAT_ASTC_8x8_UNORM_BLOCK:171,VK_FORMAT_ASTC_8x8_SRGB_BLOCK:172,VK_FORMAT_ASTC_10x5_UNORM_BLOCK:173,VK_FORMAT_ASTC_10x5_SRGB_BLOCK:174,VK_FORMAT_ASTC_10x6_UNORM_BLOCK:175,VK_FORMAT_ASTC_10x6_SRGB_BLOCK:176,VK_FORMAT_ASTC_10x8_UNORM_BLOCK:177,VK_FORMAT_ASTC_10x8_SRGB_BLOCK:178,VK_FORMAT_ASTC_10x10_UNORM_BLOCK:179,VK_FORMAT_ASTC_10x10_SRGB_BLOCK:180,VK_FORMAT_ASTC_12x10_UNORM_BLOCK:181,VK_FORMAT_ASTC_12x10_SRGB_BLOCK:182,VK_FORMAT_ASTC_12x12_UNORM_BLOCK:183,VK_FORMAT_ASTC_12x12_SRGB_BLOCK:184,VK_FORMAT_G8B8G8R8_422_UNORM:1000156e3,VK_FORMAT_B8G8R8G8_422_UNORM:1000156001,VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM:1000156002,VK_FORMAT_G8_B8R8_2PLANE_420_UNORM:1000156003,VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM:1000156004,VK_FORMAT_G8_B8R8_2PLANE_422_UNORM:1000156005,VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM:1000156006,VK_FORMAT_R10X6_UNORM_PACK16:1000156007,VK_FORMAT_R10X6G10X6_UNORM_2PACK16:1000156008,VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16:1000156009,VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16:1000156010,VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16:1000156011,VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16:1000156012,VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16:1000156013,VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16:1000156014,VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16:1000156015,VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16:1000156016,VK_FORMAT_R12X4_UNORM_PACK16:1000156017,VK_FORMAT_R12X4G12X4_UNORM_2PACK16:1000156018,VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16:1000156019,VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16:1000156020,VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16:1000156021,VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16:1000156022,VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16:1000156023,VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16:1000156024,VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16:1000156025,VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16:1000156026,VK_FORMAT_G16B16G16R16_422_UNORM:1000156027,VK_FORMAT_B16G16R16G16_422_UNORM:1000156028,VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM:1000156029,VK_FORMAT_G16_B16R16_2PLANE_420_UNORM:1000156030,VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM:1000156031,VK_FORMAT_G16_B16R16_2PLANE_422_UNORM:1000156032,VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM:1000156033,VK_FORMAT_PVRTC1_2BPP_UNORM_BLOCK_IMG:1000054e3,VK_FORMAT_PVRTC1_4BPP_UNORM_BLOCK_IMG:1000054001,VK_FORMAT_PVRTC2_2BPP_UNORM_BLOCK_IMG:1000054002,VK_FORMAT_PVRTC2_4BPP_UNORM_BLOCK_IMG:1000054003,VK_FORMAT_PVRTC1_2BPP_SRGB_BLOCK_IMG:1000054004,VK_FORMAT_PVRTC1_4BPP_SRGB_BLOCK_IMG:1000054005,VK_FORMAT_PVRTC2_2BPP_SRGB_BLOCK_IMG:1000054006,VK_FORMAT_PVRTC2_4BPP_SRGB_BLOCK_IMG:1000054007,VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK_EXT:1000066e3,VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK_EXT:1000066001,VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK_EXT:1000066002,VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK_EXT:1000066003,VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK_EXT:1000066004,VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK_EXT:1000066005,VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK_EXT:1000066006,VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK_EXT:1000066007,VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK_EXT:1000066008,VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK_EXT:1000066009,VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK_EXT:1000066010,VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK_EXT:1000066011,VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK_EXT:1000066012,VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK_EXT:1000066013,VK_FORMAT_G8B8G8R8_422_UNORM_KHR:1000156e3,VK_FORMAT_B8G8R8G8_422_UNORM_KHR:1000156001,VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM_KHR:1000156002,VK_FORMAT_G8_B8R8_2PLANE_420_UNORM_KHR:1000156003,VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM_KHR:1000156004,VK_FORMAT_G8_B8R8_2PLANE_422_UNORM_KHR:1000156005,VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM_KHR:1000156006,VK_FORMAT_R10X6_UNORM_PACK16_KHR:1000156007,VK_FORMAT_R10X6G10X6_UNORM_2PACK16_KHR:1000156008,VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16_KHR:1000156009,VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16_KHR:1000156010,VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16_KHR:1000156011,VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16_KHR:1000156012,VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16_KHR:1000156013,VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16_KHR:1000156014,VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16_KHR:1000156015,VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16_KHR:1000156016,VK_FORMAT_R12X4_UNORM_PACK16_KHR:1000156017,VK_FORMAT_R12X4G12X4_UNORM_2PACK16_KHR:1000156018,VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16_KHR:1000156019,VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16_KHR:1000156020,VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16_KHR:1000156021,VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16_KHR:1000156022,VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16_KHR:1000156023,VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16_KHR:1000156024,VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16_KHR:1000156025,VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16_KHR:1000156026,VK_FORMAT_G16B16G16R16_422_UNORM_KHR:1000156027,VK_FORMAT_B16G16R16G16_422_UNORM_KHR:1000156028,VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM_KHR:1000156029,VK_FORMAT_G16_B16R16_2PLANE_420_UNORM_KHR:1000156030,VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM_KHR:1000156031,VK_FORMAT_G16_B16R16_2PLANE_422_UNORM_KHR:1000156032,VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM_KHR:1000156033});const G=[171,75,84,88,32,50,48,187,13,10,26,10];var M,C,K,s,F,N,r,i,S;(S=M||(M={}))[S.NONE=0]="NONE",S[S.BASISLZ=1]="BASISLZ",S[S.ZSTD=2]="ZSTD",S[S.ZLIB=3]="ZLIB",function(_){_[_.BASICFORMAT=0]="BASICFORMAT"}(C||(C={})),function(_){_[_.UNSPECIFIED=0]="UNSPECIFIED",_[_.ETC1S=163]="ETC1S",_[_.UASTC=166]="UASTC"}(K||(K={})),function(_){_[_.UNSPECIFIED=0]="UNSPECIFIED",_[_.SRGB=1]="SRGB"}(s||(s={})),function(_){_[_.UNSPECIFIED=0]="UNSPECIFIED",_[_.LINEAR=1]="LINEAR",_[_.SRGB=2]="SRGB",_[_.ITU=3]="ITU",_[_.NTSC=4]="NTSC",_[_.SLOG=5]="SLOG",_[_.SLOG2=6]="SLOG2"}(F||(F={})),function(_){_[_.ALPHA_STRAIGHT=0]="ALPHA_STRAIGHT",_[_.ALPHA_PREMULTIPLIED=1]="ALPHA_PREMULTIPLIED"}(N||(N={})),function(_){_[_.RGB=0]="RGB",_[_.RRR=3]="RRR",_[_.GGG=4]="GGG",_[_.AAA=15]="AAA"}(r||(r={})),function(_){_[_.RGB=0]="RGB",_[_.RGBA=3]="RGBA",_[_.RRR=4]="RRR",_[_.RRRG=5]="RRRG"}(i||(i={}));class V{constructor(){this.vkFormat=0,this.typeSize=1,this.pixelWidth=0,this.pixelHeight=0,this.pixelDepth=0,this.layerCount=0,this.faceCount=1,this.supercompressionScheme=M.NONE,this.levels=[],this.dataFormatDescriptor=[{vendorId:0,descriptorType:C.BASICFORMAT,versionNumber:2,descriptorBlockSize:40,colorModel:K.UNSPECIFIED,colorPrimaries:s.SRGB,transferFunction:s.SRGB,flags:N.ALPHA_STRAIGHT,texelBlockDimension:{x:4,y:4,z:1,w:1},bytesPlane:[],samples:[]}],this.keyValue={},this.globalData=null}}class o{constructor(_,R,t,A){this._dataView=new DataView(_.buffer,_.byteOffset+R,t),this._littleEndian=A,this._offset=0}_nextUint8(){const _=this._dataView.getUint8(this._offset);return this._offset+=1,_}_nextUint16(){const _=this._dataView.getUint16(this._offset,this._littleEndian);return this._offset+=2,_}_nextUint32(){const _=this._dataView.getUint32(this._offset,this._littleEndian);return this._offset+=4,_}_nextUint64(){const _=this._dataView.getUint32(this._offset,this._littleEndian)+2**32*this._dataView.getUint32(this._offset+4,this._littleEndian);return this._offset+=8,_}_skip(_){return this._offset+=_,this}_scan(_,R=0){const t=this._offset;let A=0;for(;this._dataView.getUint8(this._offset)!==R&&A<_;)A++,this._offset++;return A<_&&this._offset++,new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+t,A)}}function a(_){return"undefined"!=typeof TextDecoder?(new TextDecoder).decode(_):Buffer.from(_).toString("utf8")}const U=["positiveX","negativeX","positiveY","negativeY","positiveZ","negativeZ"];let E;function L(t,A){const e=t.ktx2Buffer,O=t.supportedTargetFormats;let M;try{M=function(_){const R=new Uint8Array(_.buffer,_.byteOffset,G.length);if(R[0]!==G[0]||R[1]!==G[1]||R[2]!==G[2]||R[3]!==G[3]||R[4]!==G[4]||R[5]!==G[5]||R[6]!==G[6]||R[7]!==G[7]||R[8]!==G[8]||R[9]!==G[9]||R[10]!==G[10]||R[11]!==G[11])throw new Error("Missing KTX 2.0 identifier.");const t=new V,A=17*Uint32Array.BYTES_PER_ELEMENT,e=new o(_,G.length,A,!0);t.vkFormat=e._nextUint32(),t.typeSize=e._nextUint32(),t.pixelWidth=e._nextUint32(),t.pixelHeight=e._nextUint32(),t.pixelDepth=e._nextUint32(),t.layerCount=e._nextUint32(),t.faceCount=e._nextUint32();const T=e._nextUint32();t.supercompressionScheme=e._nextUint32();const O=e._nextUint32(),n=e._nextUint32(),B=e._nextUint32(),M=e._nextUint32(),C=e._nextUint64(),K=e._nextUint64(),s=new o(_,G.length+A,3*T*8,!0);for(let G=0;G<T;G++)t.levels.push({levelData:new Uint8Array(_.buffer,_.byteOffset+s._nextUint64(),s._nextUint64()),uncompressedByteLength:s._nextUint64()});const F=new o(_,O,n,!0),N={vendorId:F._skip(4)._nextUint16(),descriptorType:F._nextUint16(),versionNumber:F._nextUint16(),descriptorBlockSize:F._nextUint16(),colorModel:F._nextUint8(),colorPrimaries:F._nextUint8(),transferFunction:F._nextUint8(),flags:F._nextUint8(),texelBlockDimension:{x:F._nextUint8()+1,y:F._nextUint8()+1,z:F._nextUint8()+1,w:F._nextUint8()+1},bytesPlane:[F._nextUint8(),F._nextUint8(),F._nextUint8(),F._nextUint8(),F._nextUint8(),F._nextUint8(),F._nextUint8(),F._nextUint8()],samples:[]},r=(N.descriptorBlockSize/4-6)/4;for(let G=0;G<r;G++)N.samples[G]={bitOffset:F._nextUint16(),bitLength:F._nextUint8(),channelID:F._nextUint8(),samplePosition:[F._nextUint8(),F._nextUint8(),F._nextUint8(),F._nextUint8()],sampleLower:F._nextUint32(),sampleUpper:F._nextUint32()};t.dataFormatDescriptor.length=0,t.dataFormatDescriptor.push(N);const i=new o(_,B,M,!0);for(;i._offset<M;){const _=i._nextUint32(),R=i._scan(_),A=a(R),e=i._scan(_-R.byteLength);t.keyValue[A]=A.match(/^ktx/i)?a(e):e,i._offset%4&&i._skip(4-i._offset%4)}if(K<=0)return t;const S=new o(_,C,K,!0),U=S._nextUint16(),E=S._nextUint16(),L=S._nextUint32(),P=S._nextUint32(),c=S._nextUint32(),f=S._nextUint32(),I=[];for(let G=0;G<T;G++)I.push({imageFlags:S._nextUint32(),rgbSliceByteOffset:S._nextUint32(),rgbSliceByteLength:S._nextUint32(),alphaSliceByteOffset:S._nextUint32(),alphaSliceByteLength:S._nextUint32()});const l=C+S._offset,u=l+L,X=u+P,D=X+c,x=new Uint8Array(_.buffer,_.byteOffset+l,L),h=new Uint8Array(_.buffer,_.byteOffset+u,P),H=new Uint8Array(_.buffer,_.byteOffset+X,c),d=new Uint8Array(_.buffer,_.byteOffset+D,f);return t.globalData={endpointCount:U,selectorCount:E,imageDescs:I,endpointsData:x,selectorsData:h,tablesData:H,extendedData:d},t}(e)}catch(_){throw new R.RuntimeError("Invalid KTX2 file.")}if(0!==M.layerCount)throw new R.RuntimeError("KTX2 texture arrays are not supported.");if(0!==M.pixelDepth)throw new R.RuntimeError("KTX2 3D textures are unsupported.");const C=M.dataFormatDescriptor[0],K=new Array(M.levelCount);return 0!==M.vkFormat||163!==C.colorModel&&166!==C.colorModel?(A.push(e.buffer),function(R,t){const A=R.vkFormat===B.VK_FORMAT_R8G8B8_SRGB?n.RGB:n.RGBA;let e;R.vkFormat===B.VK_FORMAT_R8G8B8A8_UNORM?e=T.UNSIGNED_BYTE:R.vkFormat===B.VK_FORMAT_R16G16B16A16_SFLOAT?e=T.HALF_FLOAT:R.vkFormat===B.VK_FORMAT_R32G32B32A32_SFLOAT&&(e=T.FLOAT);for(let O=0;O<R.levels.length;++O){const B={};t[O]=B;const G=R.levels[O].levelData,M=R.pixelWidth>>O,C=R.pixelHeight>>O,K=M*C*n.componentsLength(A);for(let t=0;t<R.faceCount;++t){const O=G.byteOffset+K*R.typeSize*t;let n;n=_.defined(e)&&1!==T.sizeInBytes(e)?2===T.sizeInBytes(e)?new Uint16Array(G.buffer,O,K):new Float32Array(G.buffer,O,K):new Uint8Array(G.buffer,O,K),B[U[t]]={internalFormat:A,datatype:e,width:M,height:C,levelBuffer:n}}}}(M,K)):function(t,A,e,T,O,B){const G=new T.KTX2File(t);let M=G.getWidth(),C=G.getHeight();const K=G.getLevels(),s=G.getHasAlpha();if(!(M>0&&C>0&&K>0))throw G.close(),G.delete(),new R.RuntimeError("Invalid KTX2 file");let F,N;const r=A.dataFormatDescriptor[0],i=T.transcoder_texture_format;if(163===r.colorModel)if(e.etc)F=s?n.RGBA8_ETC2_EAC:n.RGB8_ETC2,N=s?i.cTFETC2_RGBA:i.cTFETC1_RGB;else if(e.etc1&&!s)F=n.RGB_ETC1,N=i.cTFETC1_RGB;else if(e.s3tc)F=s?n.RGBA_DXT5:n.RGB_DXT1,N=s?i.cTFBC3_RGBA:i.cTFBC1_RGB;else if(e.pvrtc)F=s?n.RGBA_PVRTC_4BPPV1:n.RGB_PVRTC_4BPPV1,N=s?i.cTFPVRTC1_4_RGBA:i.cTFPVRTC1_4_RGB;else if(e.astc)F=n.RGBA_ASTC,N=i.cTFASTC_4x4_RGBA;else{if(!e.bc7)throw new R.RuntimeError("No transcoding format target available for ETC1S compressed ktx2.");F=n.RGBA_BC7,N=i.cTFBC7_RGBA}else if(166===r.colorModel)if(e.astc)F=n.RGBA_ASTC,N=i.cTFASTC_4x4_RGBA;else if(e.bc7)F=n.RGBA_BC7,N=i.cTFBC7_RGBA;else if(e.s3tc)F=s?n.RGBA_DXT5:n.RGB_DXT1,N=s?i.cTFBC3_RGBA:i.cTFBC1_RGB;else if(e.etc)F=s?n.RGBA8_ETC2_EAC:n.RGB8_ETC2,N=s?i.cTFETC2_RGBA:i.cTFETC1_RGB;else if(e.etc1&&!s)F=n.RGB_ETC1,N=i.cTFETC1_RGB;else{if(!e.pvrtc)throw new R.RuntimeError("No transcoding format target available for UASTC compressed ktx2.");F=s?n.RGBA_PVRTC_4BPPV1:n.RGB_PVRTC_4BPPV1,N=s?i.cTFPVRTC1_4_RGBA:i.cTFPVRTC1_4_RGB}if(!G.startTranscoding())throw G.close(),G.delete(),new R.RuntimeError("startTranscoding() failed");for(let n=0;n<A.levels.length;++n){const t={};B[n]=t,M=A.pixelWidth>>n,C=A.pixelHeight>>n;const e=G.getImageTranscodedSizeInBytes(n,0,0,N.value),T=new Uint8Array(e),K=G.transcodeImage(T,n,0,0,N.value,0,-1,-1);if(!_.defined(K))throw new R.RuntimeError("transcodeImage() failed.");O.push(T.buffer),t[U[0]]={internalFormat:F,width:M,height:C,levelBuffer:T}}G.close(),G.delete()}(e,M,O,E,A,K),K}function P(_){E=_,E.initializeBasis(),self.onmessage=A(L),self.postMessage(!0)}return function(R){const t=R.data.webAssemblyConfig;if(_.defined(t))return require([t.modulePath],(function(R){if(!_.defined(t.wasmBinaryFile))return R().then((function(_){P(_)}));_.defined(R)||(R=self.MSC_TRANSCODER),R(t).then((function(_){P(_)}))}))}}));