export abstract class AbstractGen {
  abstract generate(): void | Promise<void>;
}
