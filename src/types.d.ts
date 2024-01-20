declare global {

  interface Project {
    id: string;
    title: string;
    url: string;
    img: string;
    roles: string[];
    color: string;
  }
  interface Social {
    title: string;
    url: string;
    icon: string;
  }
  interface Mouse {
    x: number;
    y: number;
  }
  interface Canvas {
    height: number;
    width: number;
    size: number;
    centerX: number;
    centerY: number;
    arc: number;
  }
  interface Circle {
    id: string;
    r: any;
    cx: any;
    cy: any;
    isPopped: boolean;
    rotate: number;
    x: number;
    y: number;
    scale: number;
    fillOpacity: number;
    strokeWidth: number;
    alpha: number;
    style: string;
  }

}

export { };