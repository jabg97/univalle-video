import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SideNavService {
  private _sideNavOpen = true;
  private _isWatch = false;
  constructor() {}

  get isOpen(): boolean {
    return this._sideNavOpen;
  }

  get isWatch(): boolean {
    return this._isWatch;
  }

  setWatch(value: boolean): void {
    this._isWatch = value;
  }

  closeNav() {
    this._sideNavOpen = false;
  }

  toggle() {
    this._sideNavOpen = !this._sideNavOpen;
  }
}
