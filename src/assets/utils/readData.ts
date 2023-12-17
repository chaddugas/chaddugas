export default function readData(el: HTMLElement | SVGElement, prop: string): string | number | boolean | object | undefined {
  let value = <any>el.dataset[prop];

  if (value === undefined) return undefined;
  else if (!isNaN(value)) value = Number(value);
  else if (value.toLowerCase() === 'true') value = true;
  else if (value.toLowerCase() === 'false') value = false;
  else value = JSON.parse(value);

  return value;
}