type ElementTag = keyof HTMLElementTagNameMap;

interface BasicOption {
  className?: string;
  id?: string;
}

export interface DivOption extends BasicOption {}

export interface ImgOption extends BasicOption {
  src: string;
  alt: string;
  loading?: 'lazy';
}

export interface POption extends BasicOption {
  textContent: string;
}

export interface InputOption extends BasicOption {
  type: string;
  placeholder?: string;
}

export type ElementOption = DivOption | ImgOption | InputOption | POption;
