export const typesMap = {"article":{"/":{"path":"/article/","indexes":[13,0,8,7,6,16,17,9,10,11,12,14,15,38,1,2,3,4,5,39]},"/zh/":{"path":"/zh/article/","indexes":[33,18,28,27,26,36,37,29,30,31,32,34,35,40,19,20,24,21,22,23,25]}},"star":{"/":{"path":"/star/","indexes":[9,13,14,0]},"/zh/":{"path":"/zh/star/","indexes":[29,33,34,18]}},"timeline":{"/":{"path":"/timeline/","indexes":[13,8,7,6,16,17,9,10,11,12,14,15,0]},"/zh/":{"path":"/zh/timeline/","indexes":[33,28,27,26,36,37,29,30,31,32,34,35,18]}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

