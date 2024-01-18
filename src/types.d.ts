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
}

export { };