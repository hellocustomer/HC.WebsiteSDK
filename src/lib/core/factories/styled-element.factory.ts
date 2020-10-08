import { camelToKebabCase } from '../utils/camel-to-kebab-case.util';

/**
 * Util class making applying 'css in js' styles easy. Provides many features:
 * * Attaching inline styles
 * * Attaching styles by creating a new style ya in header with defined class
 * * Conditionally attach styles
 * * Factory does not mutate the input element
 *
 * @category Factories
 * @typeParam T Element type
 */
export class StyledElementFactory<T extends HTMLElement> {
  private readonly elementClone: T;

  private static readonly STYLES_ATTRIBUTE = 'data-hello-customer-styles';

  public constructor(element: T) {
    this.elementClone = element.cloneNode(true) as T;
  }

  public get styledElement(): T {
    return this.elementClone;
  }

  public attachCssClass(className: string): StyledElementFactory<T> {
    this.elementClone.classList.add(className);
    return this;
  }

  public attachInlineRule(
    ruleName: keyof CSSStyleDeclaration,
    ruleValue: CSSStyleDeclaration[keyof CSSStyleDeclaration]
  ): StyledElementFactory<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.elementClone.style as Record<string, any>)[
      camelToKebabCase(ruleName)
    ] = ruleValue;
    return this;
  }

  /**
   * Attach inline style conditionally
   *
   * @param condition
   * @param style
   */
  public applyInlineConditionally(
    condition: boolean,
    style?: Partial<CSSStyleDeclaration>
  ): StyledElementFactory<T> {
    return condition && style ? this.applyInlineStyle(style) : this;
  }

  /**
   * Attach css class conditionally
   *
   * @param condition
   * @param name
   * @param style
   */
  public applyClassConditionally(
    condition: boolean,
    name: string,
    style?: Partial<CSSStyleDeclaration>
  ): StyledElementFactory<T> {
    return condition ? this.applyClass(name, style) : this;
  }

  /**
   * Attach inline style
   *
   * @param style
   */
  public applyInlineStyle(
    style: Partial<CSSStyleDeclaration>
  ): StyledElementFactory<T> {
    Object.entries(style).forEach(([key, rule]) => {
      this.attachInlineRule(
        key as keyof CSSStyleDeclaration,
        rule as CSSStyleDeclaration[keyof CSSStyleDeclaration]
      );
    });
    return this;
  }

  /**
   * Attach css class to the element, if the style object is provided,
   * besides attaching class to the element, the class gets created and posted to the header
   *
   * @param className
   * @param style
   */
  public applyClass(
    className: string,
    style?: Partial<CSSStyleDeclaration>
  ): StyledElementFactory<T> {
    this.attachCssClass(className);
    if (style) StyledElementFactory.appendCssClassToHeader(style, className);
    return this;
  }

  /**
   * Parse provided partial style and class name into a string containing css class declaration,
   * and append it to the dedicated style element in the header - marked by [[StyledElementFactory.STYLES_ATTRIBUTE]].
   * If this style element does not exist it gets created.
   *
   * @param style
   * @param name
   */
  public static appendCssClassToHeader(
    style: Partial<CSSStyleDeclaration>,
    name: string
  ): void {
    if (Object.keys(style).length < 1) return;
    const element = StyledElementFactory.getStyleElement();
    element.innerHTML += StyledElementFactory.parseStyleToClass(name, style);
  }

  /**
   * Add media rule to the header
   *
   * @param media
   * @param rules
   */
  public static addMediaRule(
    media: string,
    rules: Record<string, Partial<CSSStyleDeclaration>>
  ) {
    if (Object.keys(rules).length < 1) return;
    const element = StyledElementFactory.getStyleElement();
    element.innerHTML += `@media ${media} {${Object.entries(rules)
      .map((rule) => StyledElementFactory.parseStyleToClass(rule[0], rule[1]))
      .join(' ')}}`;
  }

  private static getStyleElement(): HTMLStyleElement {
    let element = document.querySelector(
      `[${StyledElementFactory.STYLES_ATTRIBUTE}]`
    ) as HTMLStyleElement;
    if (!element) {
      element = document.createElement('style');
      element.setAttribute(StyledElementFactory.STYLES_ATTRIBUTE, '');
      document.head.appendChild(element);
    }
    return element;
  }

  private static parseStyleToClass(
    name: string,
    style: Partial<CSSStyleDeclaration>
  ): string {
    return `.${name}{${Object.entries(style)
      .map((rule) => [camelToKebabCase(rule[0]), rule[1]])
      .map((rule) => rule.join(':'))
      .join(';')};}`;
  }
}
