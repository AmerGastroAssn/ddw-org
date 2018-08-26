import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../../models/Page';
import { PressRelease } from '../../../models/PressRelease';
import { AdminPressReleaseService } from '../../../services/admin-press-release.service';

@Component({
  selector: 'ddw-press-releases',
  templateUrl: './press-releases.component.html',
  styleUrls: ['./press-releases.component.css']
})
export class PressReleasesComponent implements OnInit {
    pressRelease$: Observable<PressRelease[]>;
    url: string;

  constructor(
    private adminPressReleaseService: AdminPressReleaseService
  ) { }

  ngOnInit() {
    this.pressRelease$ = this.adminPressReleaseService.getAllPressReleases();
  }

}
