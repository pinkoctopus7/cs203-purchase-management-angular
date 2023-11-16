import { NgxSpinnerService } from 'ngx-spinner';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  @Output() verifiedUserLoggingIn = new EventEmitter<void>();
  @Output() userLoggedOut = new EventEmitter<void>();
  emailID: string | undefined = undefined;

  email$!: Observable<string | undefined>;

  constructor(
    protected override spinner: NgxSpinnerService,
    private authService: AuthenticationService,
    private router: Router,
    private activeModal: NgbModal,
    private messageService: MessageService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.email$ = this.authService.email$;
    this.email$.subscribe((emailID: string | undefined) => {
      this.emailID = emailID;
      // console.log(this.emailID);
    });
  }

  isLoggedIn(): boolean {
    return this.authService.email != undefined;
  }
  handleLoginButtonClick(): void {
    const modalRef = this.activeModal.open(LoginPopupComponent, {
      centered: true,
    });
  }

  logoutUser(): void {
    this.authService.userID = undefined;
    this.userLoggedOut.emit();
    window.location.reload();
  }
}
