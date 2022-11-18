import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export interface PageRouting {
  title: string;
  path: string;
  component: React.FC;
  props?: any;
}