import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router, Navigation, NavigationExtras } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DashboardComponent },
          { path: 'dashboard/:id', component: DashboardComponent }
        ]),
        MatButtonModule,
        MatGridListModule
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);

    const extras: NavigationExtras = {
      state: {
        id: 1
      }
    };
    const navigation: Navigation = {
      id: 1,
      initialUrl: router.parseUrl('http://localhost:4200'),
      extractedUrl: router.parseUrl('http://localhost:4200'),
      trigger: 'imperative',
      extras,
      previousNavigation: null,
    }

    spyOn(router, 'getCurrentNavigation').and.returnValue(navigation);

    spyOn(console, 'log').and.callThrough();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const extras: NavigationExtras = {
      state: {
        id: 1
      }
    };
    expect(component).toBeTruthy();
    expect(console.log).toHaveBeenCalledWith('getCurrentNavigation', extras.state);
  });

  it('should redirect to dashboard', () => {
    const extras: NavigationExtras = {
      state: {
        id: 1,
        name: 'eduardo',
        card: '1234123412341234',
        bestweb: true
      }
    }
    spyOn(router, 'navigate').and.callThrough();
    component.goToDashboard();
    expect(router.navigate).toHaveBeenCalledWith(['dashboard'], extras);
  });

  it('should redirect to dashboard with params', () => {
    spyOn(router, 'navigate').and.callThrough();
    component.goToDashboardParams();
    expect(router.navigate).toHaveBeenCalledWith(['dashboard', '1']);
  });
});
