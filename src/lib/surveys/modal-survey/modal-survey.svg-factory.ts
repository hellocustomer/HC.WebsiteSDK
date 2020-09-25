/**
 * Create SVG close icon
 *
 * @param fill
 */
export const closeIconSvgElementFactory = (fill: string): SVGSVGElement => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 15 15`);
  svg.setAttribute('version', '1.1');
  svg.setAttribute('aria-hidden', 'true');
  const pathData = `M 12.8438 12.8594 C 13.0391 12.6641 13.0391 12.3477 12.8438 12.1523 L 8.7051 8 L 12.8455 3.8616 C 13.0408 3.6663 13.0408 3.3499 12.8455 3.1545 C 12.6501 2.9592 12.3337 2.9592 12.1384 3.1545 L 8 7.2949 L 3.8759 3.155 C 3.6805 2.9597 3.3641 2.9597 3.1688 3.155 C 2.9735 3.3503 2.9735 3.6667 3.1688 3.8621 L 7.2949 8 L 3.1563 12.1367 C 2.9609 12.332 2.9609 12.6484 3.1563 12.8438 C 3.3516 13.0391 3.668 13.0391 3.8633 12.8438 L 8 8.7051 L 12.1367 12.8594 C 12.332 13.0547 12.6484 13.0547 12.8438 12.8594 Z`;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttributeNS(null, 'd', pathData);
  path.setAttributeNS(null, 'fill', fill);
  path.setAttributeNS(null, 'vector-effect', 'non-scaling-stroke');
  path.setAttributeNS(null, 'stroke-width', '1');
  svg.appendChild(path);
  return svg;
};
