import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageChatComponent } from './image-chat.component';

describe('ImageChatComponent', () => {
  let component: ImageChatComponent;
  let fixture: ComponentFixture<ImageChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
