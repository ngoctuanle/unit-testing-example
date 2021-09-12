import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { OverlayModule } from '@angular/cdk/overlay';
import { ActivatedRoute } from '@angular/router';

describe('DetailsComponent', () => {
  let component: DetailsComponent;

  const messageServiceSpy = {
    error: jest.fn(),
    success: jest.fn()
  }

  const activatedRouteSpy = {
    params: of({id: 1})
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([]),
        OverlayModule
      ],
    }).overrideComponent(DetailsComponent, {
      set: {
        providers: [
          {
            provide: NzMessageService,
            useValue: messageServiceSpy
          },
          {
            provide: ActivatedRoute,
            useValue: activatedRouteSpy
          }
        ]
      }
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should do upload id card success', () => {
    component.onSelectImage({target: {files: [{size: 1000} as File]} as unknown} as Event)
    component.onUploadIdCard();
    expect(messageServiceSpy.success).toHaveBeenCalledWith('Upload success');
  });

  it('should do upload id card failure', () => {
    component.onSelectImage({target: {files: [{size: 4_000_000} as File]} as unknown} as Event)
    component.onUploadIdCard();
    expect(messageServiceSpy.error).toHaveBeenCalledWith('Upload failure');
  });
});
