declare module 'react-lazy-load-image-component' {
  import * as React from 'react';

  export interface LazyLoadImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    effect?: 'blur' | 'opacity' | 'black-and-white';
    placeholderSrc?: string;
  }

  export const LazyLoadImage: React.FC<LazyLoadImageProps>;
}
