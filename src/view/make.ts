const svgTags: { [tag: string]: boolean } = ['svg', 'rect', 'path']
  .reduce((acc, tag) => ({ ...acc, [tag]: true }), {});

export default function make(
  tag: string,
  attributes: Record<string, string | number> = {},
  children: (HTMLElement | SVGElement | null)[] = [],
) {
  const element = svgTags[tag]
    ? document.createElementNS('http://www.w3.org/2000/svg', tag)
    : document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value.toString());
  });

  children.forEach((child) => child && element.appendChild(child));

  return element;
}
