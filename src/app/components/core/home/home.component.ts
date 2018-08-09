import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CountdownService, Time } from '../../../services/countdown.service';

@Component({
    selector: 'ddw-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title = `Digestive Disease Week®`;
    subtitle = 'The Global Leader';
    forTime = 'for 50 Years';
    subheaderLoc = 'San Diego Convention Center | San Diego, CA';
    subheaderDate = 'May 18-21, 2019';

    time1$: Observable<Time>;
    time2$: Observable<Time>;

    constructor(private countdownService: CountdownService) {
    }

    ngOnInit() {
        this.time1$ = this.countdownService.timer(new Date('May 18, 2019 00:00:00'));
        // this.time2$ = this.countdownService.timer(new Date('August 9, 2041 15:37:25'));
    }

}
