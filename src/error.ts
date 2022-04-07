export class InstallError extends Error {
  constructor() {
    super();
    this.name = 'InstallError';
    Object.setPrototypeOf(this, InstallError.prototype);
  }
}
