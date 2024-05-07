const svgTags: { [tag: string]: boolean } = ['svg', 'rect', 'path']
  .reduce((acc, tag) => ({ ...acc, [tag]: true }), {});

interface MakeAttributes {
  [attr: string]: string | number | EventListener;
  onClick: EventListener;
}

export default function make(
  tag: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap,
  attributes: Partial<MakeAttributes>,
  children: (HTMLElement | SVGElement | null)[] = [],
) {
  const element = svgTags[tag]
    ? document.createElementNS('http://www.w3.org/2000/svg', tag)
    : document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (typeof value === 'undefined') {
      return;
    }

    if (typeof value !== 'function') {
      element.setAttribute(key, value.toString());
    }

    if (typeof value === 'function' && key.substring(0, 2) === 'on') {
      const event = key.substring(2).toLowerCase();
      element.addEventListener(event, value);
    }
  });

  children.forEach((child) => child && element.appendChild(child));

  return element;
}
