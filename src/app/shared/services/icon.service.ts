import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);

  getIcon(name: string): Observable<SafeHtml> {
    return this.http
      .get(`assets/icons/${name}.svg`, { responseType: 'text' })
      .pipe(map((svg) => this.sanitizer.bypassSecurityTrustHtml(svg)));
  }
}
