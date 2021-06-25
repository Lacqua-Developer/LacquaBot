import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatProducaoComponent } from './chat-producao.component';

describe('ChatProducaoComponent', () => {
  let component: ChatProducaoComponent;
  let fixture: ComponentFixture<ChatProducaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatProducaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
