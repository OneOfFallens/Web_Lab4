import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {route} from '../../model/functions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Hit} from '../../model/Hit';
import {HitService} from '../../services/hit.service';
import {catchError} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {DisplayModeService} from '../../services/display-mode.service';
interface val {
  name: string,
  code: number,
}
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {
  username!: string;
  $hits: Subject<Hit[]> = new Subject<Hit[]>();
  pointForm: FormGroup;
  xValue: number = 0;
  rValue: number = 1;
  xValues: val[] = [
    {name: '-5', code: -5},
    {name:'-4', code: -4},
    {name:'-3', code: -3},
    {name:'-2', code: -2},
    {name:'-1', code: -1},
    {name:'0', code: 0},
    {name:'1', code: 1},
    {name:'2', code: 2},
    {name: '3', code: 3}].reverse();
  rValues: val[] =  [
    {name:'0', code: 0},
{name:'1', code: 1},
{name:'2', code: 2},
{name: '3', code: 3}].reverse();
  canvasRadius = 1;
  matchingRadius = false;
  readonly canvasWidthHeight = 500;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              public hitService: HitService,
              public dms: DisplayModeService) {
    this.pointForm = fb.group({
      x: ['3'],
      y: ['0'],
      r: ['1']
    });
  }

  ngOnInit() {
    this.username = this.authService.username ?? '[something is wrong]';
    this.getHits();
  }

  submitHit(hit: Hit) {
    console.log(`Submitting hit with x = ${hit.x}, y = ${hit.y}, r = ${hit.r}`);
    if(hit.r===undefined) {
      hit.r=this.rValue;
    }
    if(hit.x===undefined) {
      hit.x=this.xValue;
    }
    this.hitService.postHit(hit).subscribe((res: any) => res,
      (err: HttpErrorResponse) => console.log(err),
    )
    setTimeout(() => this.getHits(), 500)
  }

  getHits() {
    console.log(`GET hits`);
    this.hitService.getHits().pipe(
      catchError(this.handleError.bind(this))
    ).subscribe(
      hits => this.$hits.next(hits as Hit[])
    );
  }

  clearHits() {
    console.log(`DELETE hits (clear)`);
    this.hitService.deleteHits().pipe(
      catchError(this.handleError.bind(this))
    ).subscribe(
      () => this.$hits.next([])
    );
  }

  private handleError(errorResp: HttpErrorResponse) {
    return throwError(errorResp);
  }

  signOut(): void {
    this.authService.signOut();
    route('/auth', this.router);
  }

  get yForm() {
    return this.pointForm.get('y')!;
  }

  get rForm() {
    return this.pointForm.get('r')!;
  }

  isNaN(value: number): boolean {
    return Number.isNaN(value);
  }
}
